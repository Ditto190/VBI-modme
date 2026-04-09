import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { PrismaService } from '../app/prisma.service';
import {
  buildInsightDSL,
  createInsightDoc,
  encodeDoc,
  toPrismaBytes,
} from '../resource/resource-doc';
import { clearResourceUpdates } from '../resource/resource-storage';
import { findReportUsages } from '../report/report-reference';
import { CreateInsightDto } from './dto/create-insight.dto';
import { UpdateInsightDto } from './dto/update-insight.dto';

@Injectable()
export class InsightService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.insight.findMany({
      orderBy: { updatedAt: 'desc' },
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findOne(id: string) {
    const insight = await this.prisma.insight.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        data: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!insight) {
      throw new NotFoundException(`Insight ${id} not found`);
    }
    return {
      id: insight.id,
      name: insight.name,
      createdAt: insight.createdAt,
      updatedAt: insight.updatedAt,
      content: buildInsightDSL(new Uint8Array(insight.data)).content,
    };
  }

  async create(dto: CreateInsightDto) {
    const id = randomUUID();
    await this.prisma.insight.create({
      data: {
        id,
        name: dto.name?.trim() || 'Untitled Insight',
        data: toPrismaBytes(encodeDoc(createInsightDoc(id, dto.content ?? ''))),
      },
    });
    return this.findOne(id);
  }

  async update(id: string, dto: UpdateInsightDto) {
    const insight = await this.findOne(id);
    await this.prisma.insight.update({
      where: { id },
      data: {
        name: dto.name?.trim() || insight.name,
        ...(dto.content !== undefined
          ? {
              data: toPrismaBytes(encodeDoc(createInsightDoc(id, dto.content))),
            }
          : {}),
      },
    });
    if (dto.content !== undefined) {
      await clearResourceUpdates(this.prisma, 'insight', id);
    }
    return this.findOne(id);
  }

  async remove(id: string) {
    await this.findOne(id);
    const usages = await findReportUsages(this.prisma, { insightId: id });
    if (usages.length > 0) {
      throw new ConflictException(
        `Insight ${id} is still referenced by report pages`,
      );
    }
    await clearResourceUpdates(this.prisma, 'insight', id);
    return this.prisma.insight.delete({
      where: { id },
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}
