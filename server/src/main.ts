import bodyParser from 'body-parser';
import csurf from 'csurf';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logger.interceptor';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { ValidationPipe } from './common/pipe/validation.pipe';
// import compression from 'compression';
import { APP } from './config/config';
import { AppModule } from './module/app.module';
import { BlogLogger } from './module/common/logger/logger';

declare const module: any;
async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  // 开启自定义logger需要在app.module中引入LoggerModule
  // app.useLogger(app.get(BlogLogger));

  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalInterceptors(new TimeoutInterceptor(), new TransformInterceptor());

  app.useGlobalPipes(new ValidationPipe());

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
