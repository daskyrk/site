import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LoggerService extends Logger {
  public error(message: string, trace: string) {
    console.error(
      JSON.stringify({
        message,
        time: new Date().toLocaleString(),
        trace,
      }),
    );
    // add your custom business logic
    super.error(message, trace);
  }
}
