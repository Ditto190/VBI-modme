import { ApiProperty } from '@nestjs/swagger';

export class InsightEntity {
  @ApiProperty()
  id: string;

  @ApiProperty({ nullable: true, required: false })
  name: string | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class InsightDetailEntity extends InsightEntity {
  @ApiProperty()
  content: string;
}
