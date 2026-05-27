import { Body, Controller, Get, Headers, HttpCode, Post, Req, Res } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import type { Request, Response } from 'express'
import { ApiDataResponse, ApiErrorResponse } from '../common/swagger/api-response.decorator'
import { SkipResponseEnvelope } from '../common/interceptors/transform.interceptor'
import { AgentStreamDto } from './dto/agent-stream.dto'
import { AgentConfigEntity } from './entities/agent-config.entity'
import { AgentStreamService } from './agent-stream.service'

@ApiTags('agent')
@Controller('agent')
export class AgentController {
  constructor(private readonly agentStreamService: AgentStreamService) {}

  @Get('config')
  @ApiOperation({ summary: 'Get public agent model config' })
  @ApiDataResponse({
    description: 'Agent config returned',
    status: 200,
    type: AgentConfigEntity,
  })
  getConfig() {
    return this.agentStreamService.getConfig()
  }

  @Post('stream')
  @HttpCode(200)
  @SkipResponseEnvelope()
  @ApiOperation({ summary: 'Proxy Pi assistant stream events' })
  @ApiBody({ type: AgentStreamDto })
  @ApiResponse({
    status: 200,
    description: 'SSE stream of Pi proxy assistant message events',
    content: {
      'text/event-stream': {
        schema: {
          type: 'string',
          example: 'data: {"type":"text_delta","contentIndex":0,"delta":"Hello"}\n\n',
        },
      },
    },
  })
  @ApiErrorResponse({
    description: 'Unauthorized stream request',
    message: 'Unauthorized agent stream request',
    status: 401,
  })
  @ApiErrorResponse({
    description: 'Invalid stream request',
    message: 'Agent stream context.messages must be an array',
    status: 400,
  })
  stream(
    @Body() dto: AgentStreamDto,
    @Headers('authorization') authorization: string | undefined,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    return this.agentStreamService.stream(dto, authorization, request, response)
  }
}
