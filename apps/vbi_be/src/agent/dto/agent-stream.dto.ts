import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class AgentStreamDto {
  @ApiProperty({
    description:
      'Pi model descriptor sent by streamProxy. The backend validates it against AGENT_PROVIDER/AGENT_MODEL.',
    type: 'object',
    additionalProperties: true,
  })
  model: Record<string, unknown>

  @ApiProperty({
    description: 'Pi context containing systemPrompt, messages, and tool schemas.',
    type: 'object',
    additionalProperties: true,
  })
  context: Record<string, unknown>

  @ApiPropertyOptional({
    description: 'Safe Pi stream options. Credentials and custom headers are ignored by the backend.',
    type: 'object',
    additionalProperties: true,
  })
  options?: Record<string, unknown>
}
