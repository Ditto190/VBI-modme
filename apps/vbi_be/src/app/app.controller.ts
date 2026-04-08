import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('system')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Health check' })
  @ApiResponse({
    status: 200,
    description: 'Service availability returned',
    schema: {
      example: {
        code: 200,
        message: 'Success',
        data: 'Hello World!',
      },
    },
  })
  getHello(): string {
    return this.appService.getHello();
  }
}
