import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { MessageService } from './messages/messages.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
}) //namespace will % the communication space, only sent in this namespace
export class ChatGateway {
  @WebSocketServer()
  server;
  constructor(private readonly messageService: MessageService) {}

  @SubscribeMessage('message') //listen for specific websocket events, server rec an event matching the name, handle message will work
  handleMessage(
    @MessageBody() message: { username: string; text: string },
  ): void {
    //@messagebody will extract the msg out from the payload coming in
    this.messageService.pushMessages(message.username, message.text); // Store message
    this.server.emit('message', message); //broadcast the msg to everyone on the
  }
}
