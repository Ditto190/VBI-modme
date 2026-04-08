import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class ReorderReportPagesDto {
  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  pageIds: string[];
}
