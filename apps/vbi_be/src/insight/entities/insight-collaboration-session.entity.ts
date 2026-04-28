import { ApiProperty } from '@nestjs/swagger'
import { InsightEntity } from './insight.entity'

export class InsightCollaborationSessionEntity {
  @ApiProperty()
  resourceId: string

  @ApiProperty()
  protocol: 'hocuspocus'

  @ApiProperty()
  roomName: string

  @ApiProperty()
  websocketUrl: string

  @ApiProperty({ type: InsightEntity })
  resource: InsightEntity
}
