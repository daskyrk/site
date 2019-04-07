import { NestFactory, Reflector } from '@nestjs/core';

import { AnyExceptionFilter } from '@/core/filters/any-exception.filter';
import { AppModule } from '@/app.module';
import { AuthGuard } from '@/core/guards/auth.guard';
import { BlogLogger } from '@/shared/logger/logger';
import { Logger } from '@nestjs/common';
import { RolesGuard } from '@/core/guards/roles.guard';
import { TimeoutInterceptor } from '@/core/interceptors/timeout.interceptor';
import { TransformInterceptor } from '@/core/interceptors/transform.interceptor';
import { ValidationPipe } from '@/core/pipe/validation.pipe';
import bodyParser from 'body-parser';
// import compression from 'compression';
import config from '@/config';
import csurf from 'csurf';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

declare const module: any;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(config.API_PREFIX);
  // 开启自定义logger需要在app.module中引入LoggerModule
  // app.useLogger(app.get(BlogLogger));

  app.useGlobalFilters(new AnyExceptionFilter());

  app.useGlobalInterceptors(
    new TimeoutInterceptor(),
    new TransformInterceptor(),
  );

  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalGuards(new AuthGuard(), new RolesGuard(new Reflector()));

  // 支持 CORS
  app.enableCors({
    credentials: true,
  });
  // 设置与安全相关的 HTTP 头
  app.use(helmet());
  // app.use(csurf({ cookie: true }));
  app.use(
    new rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );
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
