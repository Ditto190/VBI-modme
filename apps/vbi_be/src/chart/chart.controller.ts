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
import { ChartDetailEntity } from './entities/chart-detail.entity';
import { ChartCollaborationSessionEntity } from './entities/chart-collaboration-session.entity';
import { ChartEntity } from './entities/chart.entity';
import { ChartService } from './chart.service';
import { CreateChartDto } from './dto/create-chart.dto';
import { UpdateChartDto } from './dto/update-chart.dto';
import { ReportReferenceEntity } from '../report/entities/report-reference.entity';

@ApiTags('charts')
@Controller('charts')
export class ChartController {
  constructor(private readonly chartService: ChartService) {}

  @Post()
  @ApiOperation({ summary: 'Create chart' })
  @ApiBody({ type: CreateChartDto })
  @ApiDataResponse({
    description: 'Chart created',
    status: 201,
    type: ChartEntity,
  })
  @ApiErrorResponse({
    description: 'Invalid request body',
    message: 'Validation failed',
    status: 400,
  })
  create(@Body() dto: CreateChartDto) {
    return this.chartService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List charts' })
  @ApiDataResponse({
    description: 'Charts returned',
    isArray: true,
    status: 200,
    type: ChartEntity,
  })
  findAll() {
    return this.chartService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get chart detail' })
  @ApiParam({ name: 'id', description: 'Chart ID' })
  @ApiDataResponse({
    description: 'Chart returned',
    status: 200,
    type: ChartDetailEntity,
  })
  @ApiErrorResponse({
    description: 'Chart not found',
    message: 'Chart not found',
    status: 404,
  })
  findOne(@Param('id') id: string) {
    return this.chartService.findOne(id);
  }

  @Get(':id/references')
  @ApiOperation({ summary: 'Get chart report references' })
  @ApiParam({ name: 'id', description: 'Chart ID' })
  @ApiDataResponse({
    description: 'Chart references returned',
    isArray: true,
    status: 200,
    type: ReportReferenceEntity,
  })
  @ApiErrorResponse({
    description: 'Chart not found',
    message: 'Chart not found',
    status: 404,
  })
  findReferences(@Param('id') id: string) {
    return this.chartService.findReferences(id);
  }

  @Get(':id/collaboration')
  @ApiOperation({ summary: 'Get chart collaboration session metadata' })
  @ApiParam({ name: 'id', description: 'Chart ID' })
  @ApiDataResponse({
    description: 'Chart collaboration session metadata returned',
    status: 200,
    type: ChartCollaborationSessionEntity,
  })
  getCollaborationSession(@Param('id') id: string) {
    return this.chartService.getCollaborationSession(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update chart' })
  @ApiParam({ name: 'id', description: 'Chart ID' })
  @ApiBody({ type: UpdateChartDto })
  @ApiDataResponse({
    description: 'Chart updated',
    status: 200,
    type: ChartEntity,
  })
  @ApiErrorResponse({
    description: 'Chart not found',
    message: 'Chart not found',
    status: 404,
  })
  @ApiErrorResponse({
    description: 'Invalid request body',
    message: 'Validation failed',
    status: 400,
  })
  update(@Param('id') id: string, @Body() dto: UpdateChartDto) {
    return this.chartService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete chart' })
  @ApiParam({ name: 'id', description: 'Chart ID' })
  @ApiDataResponse({
    description: 'Chart deleted',
    status: 200,
    type: ChartEntity,
  })
  @ApiErrorResponse({
    description: 'Chart not found',
    message: 'Chart not found',
    status: 404,
  })
  @ApiErrorResponse({
    description: 'Chart is still referenced by a report page',
    message: 'Chart is still referenced by report pages',
    status: 409,
  })
  remove(@Param('id') id: string) {
    return this.chartService.remove(id);
  }
}
