import { Module } from '@nestjs/common';
import { ServicesModule } from './services/services.module';

/**
 * 业务模块共享的模块
 */
@Module({
  imports: [
    // ServicesModule,
  ],
})
export class SharedModule {}
