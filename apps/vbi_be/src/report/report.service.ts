import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { PrismaService } from '../app/prisma.service';
import {
  buildReportDSL,
  createChartDoc,
  createInsightDoc,
  createReportDoc,
  encodeDoc,
  toPrismaBytes,
} from '../resource/resource-doc';
import { clearResourceUpdates } from '../resource/resource-storage';
import type { VBIReportDSL } from '@visactor/vbi';
import { CreateReportDto } from './dto/create-report.dto';
import { CreateReportPageDto } from './dto/create-report-page.dto';
import { ReorderReportPagesDto } from './dto/reorder-report-pages.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { UpdateReportPageDto } from './dto/update-report-page.dto';

const getNextPageTitle = (pages: VBIReportDSL['pages']) =>
  `Page ${pages.length + 1}`;

@Injectable()
export class ReportService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.report.findMany({
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
    const report = await this.prisma.report.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        data: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!report) {
      throw new NotFoundException(`Report ${id} not found`);
    }
    const dsl = buildReportDSL(new Uint8Array(report.data));
    return {
      id: report.id,
      name: report.name,
      createdAt: report.createdAt,
      updatedAt: report.updatedAt,
      pages: dsl.pages,
    };
  }

  async create(dto: CreateReportDto) {
    const reportId = randomUUID();
    const chartId = randomUUID();
    const insightId = randomUUID();
    const pages = [{ id: randomUUID(), title: 'Page 1', chartId, insightId }];

    await this.prisma.$transaction([
      this.prisma.chart.create({
        data: {
          id: chartId,
          name: 'Chart 1',
          data: toPrismaBytes(encodeDoc(createChartDoc(chartId))),
        },
      }),
      this.prisma.insight.create({
        data: {
          id: insightId,
          name: 'Insight 1',
          data: toPrismaBytes(encodeDoc(createInsightDoc(insightId))),
        },
      }),
      this.prisma.report.create({
        data: {
          id: reportId,
          name: dto.name?.trim() || 'Untitled Report',
          data: toPrismaBytes(encodeDoc(createReportDoc(reportId, pages))),
        },
      }),
    ]);

    return this.findOne(reportId);
  }

  async update(id: string, dto: UpdateReportDto) {
    await this.ensureReport(id);
    await this.prisma.report.update({
      where: { id },
      data: { name: dto.name?.trim() || 'Untitled Report' },
    });
    return this.findOne(id);
  }

  async remove(id: string) {
    await this.ensureReport(id);
    await clearResourceUpdates(this.prisma, 'report', id);
    return this.prisma.report.delete({
      where: { id },
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async createPage(reportId: string, dto: CreateReportPageDto) {
    const report = await this.ensureReport(reportId);
    const chartId = randomUUID();
    const insightId = randomUUID();
    const dsl = buildReportDSL(new Uint8Array(report.data));
    const title = dto.title?.trim() || getNextPageTitle(dsl.pages);
    dsl.pages.push({ id: randomUUID(), title, chartId, insightId });

    await this.prisma.chart.create({
      data: {
        id: chartId,
        name: `Chart ${dsl.pages.length}`,
        data: toPrismaBytes(encodeDoc(createChartDoc(chartId))),
      },
    });
    await this.prisma.insight.create({
      data: {
        id: insightId,
        name: `Insight ${dsl.pages.length}`,
        data: toPrismaBytes(encodeDoc(createInsightDoc(insightId))),
      },
    });
    await this.persistReport(reportId, dsl);

    return this.findOne(reportId);
  }

  async updatePage(reportId: string, pageId: string, dto: UpdateReportPageDto) {
    const report = await this.ensureReport(reportId);
    const dsl = buildReportDSL(new Uint8Array(report.data));
    const page = dsl.pages.find((item) => item.id === pageId);

    if (!page) {
      throw new NotFoundException(`Page ${pageId} not found`);
    }
    if (
      dto.chartId !== undefined &&
      dto.chartId &&
      !(await this.prisma.chart.findUnique({ where: { id: dto.chartId } }))
    ) {
      throw new NotFoundException(`Chart ${dto.chartId} not found`);
    }
    if (
      dto.insightId !== undefined &&
      dto.insightId &&
      !(await this.prisma.insight.findUnique({ where: { id: dto.insightId } }))
    ) {
      throw new NotFoundException(`Insight ${dto.insightId} not found`);
    }

    page.title = dto.title?.trim() || page.title;
    if (dto.chartId !== undefined) page.chartId = dto.chartId;
    if (dto.insightId !== undefined) page.insightId = dto.insightId;

    await this.persistReport(reportId, dsl);
    return this.findOne(reportId);
  }

  async removePage(reportId: string, pageId: string) {
    const report = await this.ensureReport(reportId);
    const dsl = buildReportDSL(new Uint8Array(report.data));
    if (dsl.pages.length <= 1) {
      throw new ConflictException('Report must keep at least one page');
    }
    const pages = dsl.pages.filter((item) => item.id !== pageId);
    if (pages.length === dsl.pages.length) {
      throw new NotFoundException(`Page ${pageId} not found`);
    }
    await this.persistReport(reportId, { ...dsl, pages });
    return this.findOne(reportId);
  }

  async reorderPages(reportId: string, dto: ReorderReportPagesDto) {
    const report = await this.ensureReport(reportId);
    const dsl = buildReportDSL(new Uint8Array(report.data));
    if (dto.pageIds.length !== dsl.pages.length) {
      throw new BadRequestException(
        'Page order does not match current page count',
      );
    }
    const pageMap = new Map(dsl.pages.map((page) => [page.id, page]));
    const pages = dto.pageIds.map((pageId) => {
      const page = pageMap.get(pageId);
      if (!page) {
        throw new BadRequestException(`Unknown page ${pageId}`);
      }
      return page;
    });

    await this.persistReport(reportId, { ...dsl, pages });
    return this.findOne(reportId);
  }

  private ensureReport(id: string) {
    return this.prisma.report
      .findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          data: true,
          createdAt: true,
          updatedAt: true,
        },
      })
      .then((report) => {
        if (!report) {
          throw new NotFoundException(`Report ${id} not found`);
        }
        return report;
      });
  }

  private async persistReport(id: string, dsl: VBIReportDSL) {
    await this.prisma.report.update({
      where: { id },
      data: {
        data: toPrismaBytes(encodeDoc(createReportDoc(id, dsl.pages))),
      },
    });
    await clearResourceUpdates(this.prisma, 'report', id);
  }
}
