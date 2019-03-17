import { Injectable } from '@nestjs/common';
import { ConfigService } from './config/config.service';

@Injectable()
export class AppService {
  constructor(config: ConfigService) {
    // if (config.MONGO_URL) {
    //   // Authorization is enabled
    // }
  }
}
