import { ApiProperty } from '@nestjs/swagger'

export class AgentConfigEntity {
  @ApiProperty({ example: 'deepseek' })
  provider: string

  @ApiProperty({ example: 'deepseek-v4-flash' })
  model: string
}
