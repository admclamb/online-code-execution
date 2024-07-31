import { Module } from '@nestjs/common';
import { ExecuteService } from './execute.service';
import { ExecuteController } from './execute.controller';
import { JobService } from './job.service';

@Module({
  controllers: [ExecuteController],
  providers: [ExecuteService, JobService],
})
export class ExecuteModule {}
