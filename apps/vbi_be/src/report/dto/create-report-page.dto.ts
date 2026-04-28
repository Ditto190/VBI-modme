import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class CreateReportPageDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  title?: string
}
