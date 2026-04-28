import { ApiProperty } from '@nestjs/swagger'
import { ChartEntity } from './chart.entity'

export class ChartCollaborationSessionEntity {
  @ApiProperty()
  resourceId: string

  @ApiProperty()
  protocol: 'hocuspocus'

  @ApiProperty()
  roomName: string

  @ApiProperty()
  websocketUrl: string

  @ApiProperty({ type: ChartEntity })
  resource: ChartEntity
}
