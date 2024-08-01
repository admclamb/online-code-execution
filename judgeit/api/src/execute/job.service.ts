import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';

@Injectable()
export class JobService {
  launch(
    language: string,
    source: string,
  ): Promise<{ ran: boolean; output: string }> {
    return new Promise((resolve, reject) => {
      // Create a temporary file for the source code
      const filename = `/tmp/${Date.now()}.code`;
      require('fs').writeFileSync(filename, source);

      // Construct the command based on the language
      const command = `../docker/execute ${language} ${filename}`;

      // Execute the command
      exec(command, (error, stdout, stderr) => {
        if (error) {
          return resolve({ ran: false, output: stderr.toString() });
        }
        resolve({ ran: true, output: stdout.toString() });
      });
    });
  }
}
