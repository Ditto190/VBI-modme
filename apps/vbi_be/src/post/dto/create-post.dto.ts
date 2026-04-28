import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator'

export class CreatePostDto {
  @ApiProperty({ example: 'Quarterly summary' })
  @IsString()
  title: string

  @ApiPropertyOptional({ example: 'Post content' })
  @IsOptional()
  @IsString()
  content?: string

  @ApiProperty({ example: 'alice@example.com' })
  @IsEmail()
  authorEmail: string

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  published?: boolean
}
