import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect, ObservableSocketServer } from '@nestjs/websockets';
import { Server, Client, Socket, Adapter } from 'socket.io';

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

  @SubscribeMessage('notify')
  async Notify(client: Socket, message: any) {
    console.log('message:', message);
    client.broadcast.emit('notify', message);
  }

  @SubscribeMessage('msg')
  async getIp(client: Socket, message: any) {
    console.log('ip:', message);
    client.emit('ip_recevied', message);
  }

}
