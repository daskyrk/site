import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() server: Server;
  conns: number = 0;

  async handleConnection() {
    // A client has connected
    this.conns++;

    // Notify connected clients of current conns
    this.server.emit('conn', { conns: this.conns });
  }

  async handleDisconnect() {
    // A client has disconnected
    this.conns--;
  }

  async publish(payload: any) {
    this.server.emit('publish', payload);
  }

  @SubscribeMessage('broadcast')
  async Broadcast(client: Socket, payload: any) {
    client.broadcast.emit('broadcast', payload);
  }

  @SubscribeMessage('msg')
  async getMsg(client: Socket, payload: any) {
    client.emit('msg_received', payload);
  }

}
