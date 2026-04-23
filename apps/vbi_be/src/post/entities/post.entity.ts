import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PostEntity {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Quarterly summary' })
  title: string;

  @ApiPropertyOptional({ example: 'Post content', nullable: true })
  content: string | null;

  @ApiProperty({ example: false })
  published: boolean;

  @ApiProperty({ example: 1 })
  authorId: number;
}
