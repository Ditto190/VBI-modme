import { ApiProperty } from '@nestjs/swagger'

class AgentModelDescriptorEntity {
  @ApiProperty({ example: 'deepseek-v4-flash' })
  id: string

  @ApiProperty({ example: 'DeepSeek V4 Flash' })
  name: string

  @ApiProperty({ example: 'openai-completions' })
  api: string

  @ApiProperty({ example: 'deepseek' })
  provider: string
}

export class AgentConfigEntity {
  @ApiProperty({ example: 'deepseek' })
  provider: string

  @ApiProperty({ example: 'deepseek-v4-flash' })
  model: string

  @ApiProperty({ example: ['deepseek-v4-flash', 'deepseek-v4-pro'], type: [String] })
  models: string[]

  @ApiProperty({
    example: { 'deepseek-chat': 'deepseek-v4-flash', 'deepseek-reasoner': 'deepseek-v4-pro' },
    type: 'object',
    additionalProperties: { type: 'string' },
  })
  modelAliases: Record<string, string>

  @ApiProperty({ type: [AgentModelDescriptorEntity] })
  modelDescriptors: AgentModelDescriptorEntity[]

  @ApiProperty({ example: ['maxTokens', 'metadata', 'reasoning', 'temperature'], type: [String] })
  streamOptionKeys: string[]
}
