import { ApiProperty } from '@nestjs/swagger';

export class ChartEntity {
  @ApiProperty()
  id: string;

  @ApiProperty({ nullable: true, required: false })
  name: string | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
