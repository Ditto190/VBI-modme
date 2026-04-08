import { ApiProperty } from '@nestjs/swagger';
import { ResourceEntity } from '../../resource/resource.entity';

export class ReportPageEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  chartId: string;

  @ApiProperty()
  insightId: string;
}

export class ReportDetailEntity extends ResourceEntity {
  @ApiProperty({ type: [ReportPageEntity] })
  pages: ReportPageEntity[];
}
