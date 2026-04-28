import { ApiProperty } from '@nestjs/swagger'
import { ChartEntity } from './chart.entity'

export class ChartDetailEntity extends ChartEntity {
  @ApiProperty({ type: Object })
  dsl: Record<string, unknown>
}
