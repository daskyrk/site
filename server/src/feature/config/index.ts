import path from 'path';
import { ConfigService } from './config.service';

const config = new ConfigService(
  path.resolve(__dirname, `.env.${process.env.NODE_ENV}`),
);

export { config };
