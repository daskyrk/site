import { ConfigService } from './feature/config/config.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(config: ConfigService) {
    // if (config.MONGO_URL) {
    //   // Authorization is enabled
    // }
  }
}
