import { ApiProperty } from '@nestjs/swagger';
import { ResourceEntity } from '../../resource/resource.entity';

export class InsightEntity extends ResourceEntity {
  @ApiProperty()
  content: string;
}
