import { Module } from '@nestjs/common'
import { AgentController } from './agent.controller'
import { AgentStreamService } from './agent-stream.service'

@Module({
  controllers: [AgentController],
  providers: [AgentStreamService],
})
export class AgentModule {}
