import { ApiProperty } from '@nestjs/swagger';
import { ReportEntity } from './report.entity';

export class ReportCollaborationSessionEntity {
  @ApiProperty()
  resourceId: string;

  @ApiProperty()
  protocol: 'hocuspocus';

  @ApiProperty()
  roomName: string;

  @ApiProperty()
  websocketUrl: string;

  @ApiProperty({ type: ReportEntity })
  resource: ReportEntity;
}
