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
import { CreateInsightDto } from './dto/create-insight.dto';
import { UpdateInsightDto } from './dto/update-insight.dto';
import { InsightEntity } from './entities/insight.entity';
import { InsightService } from './insight.service';

@ApiTags('insights')
@Controller('insights')
export class InsightController {
  constructor(private readonly insightService: InsightService) {}

  @Post()
  @ApiOperation({ summary: 'Create insight' })
  @ApiBody({ type: CreateInsightDto })
  @ApiDataResponse({
    description: 'Insight created',
    status: 201,
    type: InsightEntity,
  })
  @ApiErrorResponse({
    description: 'Invalid request body',
    message: 'Validation failed',
    status: 400,
  })
  create(@Body() dto: CreateInsightDto) {
    return this.insightService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List insights' })
  @ApiDataResponse({
    description: 'Insights returned',
    isArray: true,
    status: 200,
    type: ResourceEntity,
  })
  findAll() {
    return this.insightService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get insight detail' })
  @ApiParam({ name: 'id', description: 'Insight ID' })
  @ApiDataResponse({
    description: 'Insight returned',
    status: 200,
    type: InsightEntity,
  })
  @ApiErrorResponse({
    description: 'Insight not found',
    message: 'Insight not found',
    status: 404,
  })
  findOne(@Param('id') id: string) {
    return this.insightService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update insight' })
  @ApiParam({ name: 'id', description: 'Insight ID' })
  @ApiBody({ type: UpdateInsightDto })
  @ApiDataResponse({
    description: 'Insight updated',
    status: 200,
    type: InsightEntity,
  })
  @ApiErrorResponse({
    description: 'Insight not found',
    message: 'Insight not found',
    status: 404,
  })
  @ApiErrorResponse({
    description: 'Invalid request body',
    message: 'Validation failed',
    status: 400,
  })
  update(@Param('id') id: string, @Body() dto: UpdateInsightDto) {
    return this.insightService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete insight' })
  @ApiParam({ name: 'id', description: 'Insight ID' })
  @ApiDataResponse({
    description: 'Insight deleted',
    status: 200,
    type: ResourceEntity,
  })
  @ApiErrorResponse({
    description: 'Insight not found',
    message: 'Insight not found',
    status: 404,
  })
  @ApiErrorResponse({
    description: 'Insight is still referenced by a report page',
    message: 'Insight is still referenced by report pages',
    status: 409,
  })
  remove(@Param('id') id: string) {
    return this.insightService.remove(id);
  }
}
