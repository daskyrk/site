import { Module, Global } from '@nestjs/common';
// import { ServicesModule } from './services/services.module';
import { SocketGateway } from './socket/socket.gateway';

/**
 * 业务模块共享的模块
 */
@Global()
@Module({
  imports: [],
  exports: [SocketGateway],
  providers: [SocketGateway],
})
export class SharedModule { }
