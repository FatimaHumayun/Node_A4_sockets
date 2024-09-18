import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGateway } from './chat.gateway';
import { ScheduleModule } from '@nestjs/schedule';
import { CronService } from './cron/cron.service';
import { MessageService } from './messages/messages.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, ChatGateway, CronService, MessageService],
})
export class AppModule {}
