import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class UserEntity {
  @ApiProperty({ example: 1 })
  id: number

  @ApiProperty({ example: 'alice@example.com' })
  email: string

  @ApiPropertyOptional({ example: 'Alice', nullable: true })
  name: string | null
}
