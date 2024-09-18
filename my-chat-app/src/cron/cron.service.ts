import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MessageService } from '../messages/messages.service';

@Injectable()
export class CronService {
  constructor(private readonly messageService: MessageService) {}
  @Cron(CronExpression.EVERY_30_SECONDS)
  async handleCron() {
    try {
      console.log('Cron job running every 2 hours');
      await this.messageService.saveMessagesToFile();
      console.log('Archived Chats');
    } catch (error) {
      console.error('Error occurred during cron job execution:', error);
    }
  }
}
