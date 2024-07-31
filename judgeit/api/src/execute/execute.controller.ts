import { Controller, Post, Body, Res } from '@nestjs/common';
import { JobService } from './job.service';
import { Response } from 'express';

interface InboundDto {
  language: string;
  source: string;
}

@Controller('execute')
export class ExecuteController {
  constructor(private readonly jobService: JobService) {}

  @Post()
  async execute(@Body() inbound: InboundDto, @Res() res: Response) {
    const whitelist = [
      'python2',
      'python',
      'python3',
      'ruby',
      'javascript',
      'js',
      'node',
    ];

    if (!whitelist.includes(inbound.language)) {
      return res.status(400).json({
        code: 'unsupported_language',
        message: `${inbound.language} is not supported`,
      });
    }

    try {
      const result = await this.jobService.launch(
        inbound.language,
        inbound.source,
      );
      return res.json(result);
    } catch (error) {
      return res.status(500).json({
        code: 'execution_failed',
        message: 'Error executing code',
        error: error.message,
      });
    }
  }
}
