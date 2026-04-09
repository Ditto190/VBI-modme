import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { PrismaService } from '../app/prisma.service';
import {
  buildChartDSL,
  createChartDoc,
  encodeDoc,
  toPrismaBytes,
} from '../resource/resource-doc';
import { clearResourceUpdates } from '../resource/resource-storage';
import { findReportUsages } from '../report/report-reference';
import { CreateChartDto } from './dto/create-chart.dto';
import { UpdateChartDto } from './dto/update-chart.dto';

@Injectable()
export class ChartService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.chart.findMany({
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
    const chart = await this.prisma.chart.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        data: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!chart) {
      throw new NotFoundException(`Chart ${id} not found`);
    }
    return {
      id: chart.id,
      name: chart.name,
      createdAt: chart.createdAt,
      updatedAt: chart.updatedAt,
      dsl: buildChartDSL(new Uint8Array(chart.data)),
    };
  }

  async create(dto: CreateChartDto) {
    const id = randomUUID();
    return this.prisma.chart.create({
      data: {
        id,
        name: dto.name?.trim() || 'Untitled Chart',
        data: toPrismaBytes(encodeDoc(createChartDoc(id))),
      },
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async update(id: string, dto: UpdateChartDto) {
    await this.findOne(id);
    return this.prisma.chart.update({
      where: { id },
      data: { name: dto.name?.trim() || 'Untitled Chart' },
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    const usages = await findReportUsages(this.prisma, { chartId: id });
    if (usages.length > 0) {
      throw new ConflictException(
        `Chart ${id} is still referenced by report pages`,
      );
    }
    await clearResourceUpdates(this.prisma, 'chart', id);
    return this.prisma.chart.delete({
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
