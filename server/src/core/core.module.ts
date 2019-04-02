import { Module } from '@nestjs/common';

/**
 * 核心模块，只会注入到AppModule，不会注入到feature和shared模块里面，专门做初始化配置工作，不需要导出任何模块。
 * 它里面包括：守卫，管道，过滤器、拦截器、中间件、全局模块、常量、装饰器
 */
@Module({
  imports:[
  ],
})
export class CoreModule {}
