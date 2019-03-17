import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import helmet from 'helmet';
import csurf from 'csurf';
import rateLimit from 'express-rate-limit';
import bodyParser from 'body-parser';
// import compression from 'compression';
import { APP } from './config/config';
// import { BlogLogger } from './module/common/logger/logger';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logger.interceptor';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';

import { AppModule } from './module/app.module';

declare const module: any;
async function bootstrap() {
  console.log('*****************');

  const app = await NestFactory.create(AppModule);
  // const logger = app.get(BlogLogger);

  // app.useLogger(logger);

  // logger.log(APP.name + ' start...');

  app.useGlobalFilters(new HttpExceptionFilter());

  // app.useGlobalInterceptors(new LoggingInterceptor(logger), new TimeoutInterceptor());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  // app.useGlobalGuards(new AuthIsVerifiedGuard());

  // 支持 CORS
  app.enableCors({
    credentials: true,
  });
  // 设置与安全相关的 HTTP 头
  app.use(helmet());
  // app.use(csurf({ cookie: true }));
  app.use(new rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  }));
  // app.use(bodyParser.urlencoded({ extended: true }));
  // app.use(bodyParser.json());
  // app.use(compression());

  await app.listen(8000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
