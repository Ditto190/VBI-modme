import { ApiProperty } from '@nestjs/swagger'

export class ApiEnvelopeDto {
  @ApiProperty({ example: 200 })
  code: number

  @ApiProperty({ example: 'Success' })
  message: string

  @ApiProperty({
    additionalProperties: true,
    nullable: true,
    type: 'object',
  })
  data: Record<string, unknown> | null
}

export class ApiErrorEnvelopeDto {
  @ApiProperty({ example: 400 })
  code: number

  @ApiProperty({ example: 'Bad Request' })
  message: string

  @ApiProperty({ nullable: true, example: null })
  data: null
}
