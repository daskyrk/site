import { GraphQLModule } from '@nestjs/graphql';
import { MailerModule } from './mailer';
import { Module } from '@nestjs/common';
import { MongooseModule } from 'daskyrk-mongoose';
import config from '@/config';

/**
 * 核心模块，只会注入到AppModule，不会注入到feature和shared模块里面，专门做初始化配置工作，不需要导出任何模块。
 * 包括：守卫，管道，过滤器、拦截器、中间件、全局模块、常量、装饰器
 */
@Module({
  imports: [
    // GraphQLModule.forRoot({
    //   typePaths: ['./**/*.graphql'],
    //   // debug: false,
    //   // playground: false,
    // }),
    MongooseModule.forRoot(config.MONGO_URI),
    MailerModule.forRoot({
      host: config.EMAIL_HOST, // 邮箱smtp地址
      port: +config.EMAIL_PORT, // 端口号
      secure: true,
      secureConnection: true,
      auth: {
        user: config.EMAIL_ACCOUNT, // 邮箱账号
        pass: config.EMAIL_PASSWORD, // 授权码
      },
      ignoreTLS: true,
    }),
  ],
})
export class CoreModule {}
