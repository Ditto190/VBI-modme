import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import {
  ApiDataResponse,
  ApiErrorResponse,
} from '../common/swagger/api-response.decorator';
import { ResourceEntity } from '../resource/resource.entity';
import { CreateReportDto } from './dto/create-report.dto';
import { CreateReportPageDto } from './dto/create-report-page.dto';
import { ReorderReportPagesDto } from './dto/reorder-report-pages.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { UpdateReportPageDto } from './dto/update-report-page.dto';
import { ReportDetailEntity } from './entities/report.entity';
import { ReportService } from './report.service';

@ApiTags('reports')
@Controller('reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post()
  @ApiOperation({ summary: 'Create report' })
  @ApiBody({ type: CreateReportDto })
  @ApiDataResponse({
    description: 'Report created',
    status: 201,
    type: ReportDetailEntity,
  })
  @ApiErrorResponse({
    description: 'Invalid request body',
    message: 'Validation failed',
    status: 400,
  })
  create(@Body() dto: CreateReportDto) {
    return this.reportService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List reports' })
  @ApiDataResponse({
    description: 'Reports returned',
    isArray: true,
    status: 200,
    type: ResourceEntity,
  })
  findAll() {
    return this.reportService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get report detail' })
  @ApiParam({ name: 'id', description: 'Report ID' })
  @ApiDataResponse({
    description: 'Report returned',
    status: 200,
    type: ReportDetailEntity,
  })
  @ApiErrorResponse({
    description: 'Report not found',
    message: 'Report not found',
    status: 404,
  })
  findOne(@Param('id') id: string) {
    return this.reportService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update report' })
  @ApiParam({ name: 'id', description: 'Report ID' })
  @ApiBody({ type: UpdateReportDto })
  @ApiDataResponse({
    description: 'Report updated',
    status: 200,
    type: ReportDetailEntity,
  })
  @ApiErrorResponse({
    description: 'Report not found',
    message: 'Report not found',
    status: 404,
  })
  @ApiErrorResponse({
    description: 'Invalid request body',
    message: 'Validation failed',
    status: 400,
  })
  update(@Param('id') id: string, @Body() dto: UpdateReportDto) {
    return this.reportService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete report' })
  @ApiParam({ name: 'id', description: 'Report ID' })
  @ApiDataResponse({
    description: 'Report deleted',
    status: 200,
    type: ResourceEntity,
  })
  @ApiErrorResponse({
    description: 'Report not found',
    message: 'Report not found',
    status: 404,
  })
  remove(@Param('id') id: string) {
    return this.reportService.remove(id);
  }

  @Post(':id/pages')
  @ApiOperation({ summary: 'Create report page' })
  @ApiParam({ name: 'id', description: 'Report ID' })
  @ApiBody({ type: CreateReportPageDto })
  @ApiDataResponse({
    description: 'Report page created',
    status: 201,
    type: ReportDetailEntity,
  })
  @ApiErrorResponse({
    description: 'Report not found',
    message: 'Report not found',
    status: 404,
  })
  @ApiErrorResponse({
    description: 'Invalid request body',
    message: 'Validation failed',
    status: 400,
  })
  createPage(@Param('id') id: string, @Body() dto: CreateReportPageDto) {
    return this.reportService.createPage(id, dto);
  }

  @Patch(':id/pages/reorder')
  @ApiOperation({ summary: 'Reorder report pages' })
  @ApiParam({ name: 'id', description: 'Report ID' })
  @ApiBody({ type: ReorderReportPagesDto })
  @ApiDataResponse({
    description: 'Report pages reordered',
    status: 200,
    type: ReportDetailEntity,
  })
  @ApiErrorResponse({
    description: 'Report not found',
    message: 'Report not found',
    status: 404,
  })
  @ApiErrorResponse({
    description: 'Invalid page order',
    message: 'Page order does not match current page count',
    status: 400,
  })
  reorderPages(@Param('id') id: string, @Body() dto: ReorderReportPagesDto) {
    return this.reportService.reorderPages(id, dto);
  }

  @Patch(':id/pages/:pageId')
  @ApiOperation({ summary: 'Update report page' })
  @ApiParam({ name: 'id', description: 'Report ID' })
  @ApiParam({ name: 'pageId', description: 'Report page ID' })
  @ApiBody({ type: UpdateReportPageDto })
  @ApiDataResponse({
    description: 'Report page updated',
    status: 200,
    type: ReportDetailEntity,
  })
  @ApiErrorResponse({
    description: 'Report, page, chart, or insight not found',
    message: 'Resource not found',
    status: 404,
  })
  @ApiErrorResponse({
    description: 'Invalid request body',
    message: 'Validation failed',
    status: 400,
  })
  updatePage(
    @Param('id') id: string,
    @Param('pageId') pageId: string,
    @Body() dto: UpdateReportPageDto,
  ) {
    return this.reportService.updatePage(id, pageId, dto);
  }

  @Delete(':id/pages/:pageId')
  @ApiOperation({ summary: 'Delete report page' })
  @ApiParam({ name: 'id', description: 'Report ID' })
  @ApiParam({ name: 'pageId', description: 'Report page ID' })
  @ApiDataResponse({
    description: 'Report page deleted',
    status: 200,
    type: ReportDetailEntity,
  })
  @ApiErrorResponse({
    description: 'Report or page not found',
    message: 'Resource not found',
    status: 404,
  })
  @ApiErrorResponse({
    description: 'Report must keep at least one page',
    message: 'Report must keep at least one page',
    status: 409,
  })
  removePage(@Param('id') id: string, @Param('pageId') pageId: string) {
    return this.reportService.removePage(id, pageId);
  }
}
