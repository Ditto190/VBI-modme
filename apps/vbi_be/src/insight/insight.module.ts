import { Module } from '@nestjs/common';
import { PrismaService } from '../app/prisma.service';
import { InsightController } from './insight.controller';
import { InsightService } from './insight.service';

@Module({
  controllers: [InsightController],
  providers: [InsightService, PrismaService],
})
export class InsightModule {}
