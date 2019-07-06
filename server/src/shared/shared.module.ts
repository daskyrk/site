import { Module } from '@nestjs/common';
// import { ServicesModule } from './services/services.module';
import { SocketGateway } from './socket/socket.gateway';

/**
 * 业务模块共享的模块
 */
@Module({
  imports: [],
  exports: [],
  providers: [SocketGateway],
})
export class SharedModule { }
