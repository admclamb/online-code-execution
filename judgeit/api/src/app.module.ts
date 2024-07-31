import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExecuteModule } from './execute/execute.module';

@Module({
  imports: [ExecuteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
