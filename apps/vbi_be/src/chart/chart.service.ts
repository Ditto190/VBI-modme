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
} from '../common/vbi-doc';
import { getCollaborationWebSocketUrl } from '../common/collaboration';
import { findReportUsages } from '../report/report-reference';
import { buildChartRoomName, clearChartUpdates } from './chart-collaboration';
import { CreateChartDto } from './dto/create-chart.dto';
import { UpdateChartDto } from './dto/update-chart.dto';

const summarySelect = {
  id: true,
  name: true,
  createdAt: true,
  updatedAt: true,
} as const;

const snapshotSelect = {
  ...summarySelect,
  data: true,
} as const;

@Injectable()
export class ChartService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.chart.findMany({
      orderBy: { updatedAt: 'desc' },
      select: summarySelect,
    });
  }

  async findOne(id: string) {
    const chart = await this.requireSnapshot(id);
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
    await this.requireSummary(id);
    return this.prisma.chart.update({
      where: { id },
      data: { name: dto.name?.trim() || 'Untitled Chart' },
      select: summarySelect,
    });
  }

  async findReferences(id: string) {
    await this.requireSummary(id);
    return findReportUsages(this.prisma, { chartId: id });
  }

  async getCollaborationSession(id: string) {
    return {
      resourceId: id,
      protocol: 'hocuspocus' as const,
      roomName: buildChartRoomName(id),
      websocketUrl: getCollaborationWebSocketUrl(),
      resource: await this.requireSummary(id),
    };
  }

  async remove(id: string) {
    await this.requireSummary(id);
    const usages = await findReportUsages(this.prisma, { chartId: id });
    if (usages.length > 0) {
      throw new ConflictException(
        `Chart ${id} is still referenced by report pages`,
      );
    }
    await clearChartUpdates(this.prisma, id);
    return this.prisma.chart.delete({ where: { id }, select: summarySelect });
  }

  private async requireSummary(id: string) {
    const chart = await this.prisma.chart.findUnique({
      where: { id },
      select: summarySelect,
    });
    if (!chart) {
      throw new NotFoundException(`Chart ${id} not found`);
    }
    return chart;
  }

  private async requireSnapshot(id: string) {
    const chart = await this.prisma.chart.findUnique({
      where: { id },
      select: snapshotSelect,
    });
    if (!chart) {
      throw new NotFoundException(`Chart ${id} not found`);
    }
    return chart;
  }
}
