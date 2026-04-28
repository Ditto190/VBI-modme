import { ApiProperty } from '@nestjs/swagger'

export class ReportEntity {
  @ApiProperty()
  id: string

  @ApiProperty({ nullable: true, required: false })
  name: string | null

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date
}

export class ReportPageEntity {
  @ApiProperty()
  id: string

  @ApiProperty()
  title: string

  @ApiProperty()
  chartId: string

  @ApiProperty()
  insightId: string
}

export class ReportDetailEntity extends ReportEntity {
  @ApiProperty({ type: [ReportPageEntity] })
  pages: ReportPageEntity[]
}
