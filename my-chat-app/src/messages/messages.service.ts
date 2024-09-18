import { Injectable } from '@nestjs/common';
import { Messages } from './message.interface';
import { formatMessageContent } from 'src/messages/message.utils';
import * as path from 'path';
import { writeFileSync } from 'fs';
@Injectable()
export class MessageService {
  private messages: Messages[] = []; //creating an array of Messages object

  //Push a message
  pushMessages(username: string, text: string) {
    this.messages.push({ username, text });
  }
  //fetch messages
  fetchMessage(): Messages[] {
    return this.messages;
  }
  saveMessagesToFile() {
    try {
      const fileMessages = this.fetchMessage();
      console.log('file fata', fileMessages);
      const file = path.resolve(__dirname, '../../finalfile.txt');
      console.log('Resolved file path:', file);
      const messageFileContent = formatMessageContent(fileMessages);
      console.log('Formatted message content:', messageFileContent);
      //write to file
      //giving path and the content extracted
      writeFileSync(file, messageFileContent, 'utf8'); //writes data synchronously
      console.log('lalal', messageFileContent);
      //archive messages here
      this.messages = [];
    } catch (error) {
      console.error('Error saving messages to file:', error);
    }
  }
}
