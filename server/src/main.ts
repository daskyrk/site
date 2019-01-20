import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import helmet from 'helmet';
import bodyParser from 'body-parser';
import rateLimit from 'express-rate-limit';
import compression from 'compression';
import { APP } from '@/config';
import { BlogLogger } from '@/module/common/logger/logger';
import { HttpExceptionFilter } from '@/common/filters/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logger.interceptor';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = app.get(BlogLogger);

  app.useLogger(logger);

  logger.log(APP.name + ' start...');

  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalInterceptors(new LoggingInterceptor(logger), new TimeoutInterceptor());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true
    })
  );

  // app.useGlobalGuards(new AuthIsVerifiedGuard());

  // 支持 CORS
  app.enableCors({
    credentials: true
  });
  app.use(helmet());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(
    new rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100 // limit each IP to 100 requests per windowMs
    })
  );
  app.use(compression());

  await app.listen(3000);
}
bootstrap();
