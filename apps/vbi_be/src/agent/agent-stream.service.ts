import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common'
import type { Request, Response } from 'express'
import type { AssistantMessageEvent, Context, Model, SimpleStreamOptions } from '@earendil-works/pi-ai'
import {
  emptyUsage,
  resolveModelIdAlias,
  sanitizeModel,
  sanitizeStreamOptions,
  toProxyAssistantMessageEvent,
  type ProxyAssistantMessageEvent,
} from './agent-stream-proxy'

type PiAiModule = typeof import('@earendil-works/pi-ai')

const defaultAgentProvider = 'deepseek'
const defaultAgentModel = 'deepseek-v4-flash'

const dynamicImport = new Function('specifier', 'return import(specifier)') as <T>(specifier: string) => Promise<T>

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const readString = (value: unknown) => (typeof value === 'string' && value.trim() ? value.trim() : undefined)

const writeSseEvent = (response: Response, event: ProxyAssistantMessageEvent) => {
  if (response.writableEnded || response.destroyed) return
  response.write(`data: ${JSON.stringify(event)}\n\n`)
}

const proxyErrorEvent = (error: unknown): ProxyAssistantMessageEvent => ({
  type: 'error',
  reason: 'error',
  errorMessage: error instanceof Error ? error.message : String(error),
  usage: emptyUsage(),
})

const readErrorMessage = (error: unknown) => {
  if (error instanceof HttpException) {
    const response = error.getResponse()
    if (typeof response === 'string') return response
    if (isRecord(response) && typeof response.message === 'string') return response.message
    if (isRecord(response) && Array.isArray(response.message)) return response.message.join('; ')
  }
  return error instanceof Error ? error.message : String(error)
}

const writeProxyHttpError = (response: Response, error: unknown) => {
  if (response.headersSent || response.writableEnded || response.destroyed) return
  const status = error instanceof HttpException ? error.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR
  response.status(status).json({ error: readErrorMessage(error) })
}

@Injectable()
export class AgentStreamService {
  private piAiModule?: Promise<PiAiModule>

  getConfig() {
    const provider = this.getConfiguredProvider()
    return {
      provider,
      model: this.getConfiguredModel(provider),
    }
  }

  async stream(body: unknown, authorization: string | undefined, request: Request, response: Response) {
    const abortController = new AbortController()
    const abortOnClose = () => abortController.abort()
    request.on('close', abortOnClose)

    let isStreaming = false

    try {
      this.assertAuthorized(authorization)
      const payload = this.parsePayload(body)

      response.status(200)
      response.setHeader('Content-Type', 'text/event-stream')
      response.setHeader('Cache-Control', 'no-cache, no-transform')
      response.setHeader('Connection', 'keep-alive')
      response.flushHeaders?.()
      isStreaming = true

      const { streamSimple } = await this.loadPiAi()
      const model = await this.resolveModel(payload.model)
      const apiKey = this.getApiKey()
      const options: SimpleStreamOptions = {
        ...sanitizeStreamOptions(payload.options),
        apiKey,
        signal: abortController.signal,
      }
      const eventStream = streamSimple(model, payload.context, options) as AsyncIterable<AssistantMessageEvent>

      for await (const event of eventStream) {
        writeSseEvent(response, toProxyAssistantMessageEvent(event))
      }
    } catch (error) {
      if (isStreaming || response.headersSent) {
        writeSseEvent(response, proxyErrorEvent(error))
      } else {
        writeProxyHttpError(response, error)
      }
    } finally {
      request.off('close', abortOnClose)
      if (isStreaming && !response.writableEnded && !response.destroyed) response.end()
    }
  }

  private loadPiAi() {
    this.piAiModule ??= dynamicImport<PiAiModule>('@earendil-works/pi-ai')
    return this.piAiModule
  }

  private assertAuthorized(authorization: string | undefined) {
    const expected = readString(process.env.AGENT_PROXY_AUTH_TOKEN)
    if (!expected) return
    if (authorization !== `Bearer ${expected}`) {
      throw new UnauthorizedException('Unauthorized agent stream request')
    }
  }

  private parsePayload(body: unknown) {
    if (!isRecord(body)) throw new BadRequestException('Agent stream body must be an object')
    const context = body.context
    if (!isRecord(context) || !Array.isArray(context.messages)) {
      throw new BadRequestException('Agent stream context.messages must be an array')
    }
    return {
      model: body.model,
      context: context as unknown as Context,
      options: body.options,
    }
  }

  private getConfiguredProvider() {
    return readString(process.env.AGENT_PROVIDER) ?? defaultAgentProvider
  }

  private getConfiguredModel(provider: string) {
    return resolveModelIdAlias(provider, readString(process.env.AGENT_MODEL) ?? defaultAgentModel)
  }

  private getApiKey() {
    const apiKey = readString(process.env.AGENT_API_KEY)
    if (!apiKey) throw new ServiceUnavailableException('AGENT_API_KEY is required for agent stream proxy')
    return apiKey
  }

  private readRequestedModel(input: unknown) {
    if (!isRecord(input)) return undefined
    const provider = readString(input.provider)
    const id = readString(input.id)
    return provider && id ? { provider, id: resolveModelIdAlias(provider, id) } : undefined
  }

  private async resolveModel(input: unknown): Promise<Model<any>> {
    const { getModel, getModels } = await this.loadPiAi()
    const provider = this.getConfiguredProvider()
    const modelId = this.getConfiguredModel(provider)
    const requested = this.readRequestedModel(input)

    if (requested && (requested.provider !== provider || requested.id !== modelId)) {
      throw new BadRequestException(`Unsupported agent model: ${requested.provider}/${requested.id}`)
    }

    const model = getModel(provider as never, modelId as never)
    if (!model) {
      const available = getModels(provider as never)
        .map((item) => item.id)
        .join(', ')
      throw new BadRequestException(
        `Unsupported configured agent model: ${provider}/${modelId}${available ? `. Available: ${available}` : ''}`,
      )
    }

    return sanitizeModel(model, readString(process.env.AGENT_BASE_URL))
  }
}
