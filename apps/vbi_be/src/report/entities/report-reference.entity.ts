import { ApiProperty } from '@nestjs/swagger'

export class ReportReferenceEntity {
  @ApiProperty()
  reportId: string

  @ApiProperty()
  pageId: string
}
