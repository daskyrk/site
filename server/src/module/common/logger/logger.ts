import { Injectable, LoggerService } from '@nestjs/common';
import log4js, { Logger } from 'log4js';

import { LOG4J } from '@/config/config';

@Injectable()
export class BlogLogger implements LoggerService {
  private readonly logger: Logger;

  constructor() {
    log4js.configure(LOG4J);
    this.logger = log4js.getLogger();
  }

  public error(message: string, trace?: string) {
    this.logger.error(message, trace);
  }

  public log(message: string) {
    this.logger.info(message);
  }

  public warn(message: string) {
    this.logger.warn(message);
  }
}
