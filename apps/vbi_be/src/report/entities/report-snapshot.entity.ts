import { ApiProperty } from '@nestjs/swagger';

export class ReportSnapshotEntity {
  @ApiProperty({ type: Object })
  report: Record<string, unknown>;

  @ApiProperty({ type: Object })
  charts: Record<string, unknown>;

  @ApiProperty({ type: Object })
  insights: Record<string, unknown>;
}
