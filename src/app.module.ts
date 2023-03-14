import { ChatgptService } from './chatGPT/chatgpt.service';
import { BaseModule } from './base.module';
import { CatModule } from './cats/cat.module';
import { Module } from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { AppService } from './service/app.service';
import { GPTProviderService } from './chatGPT/gptprovider';

@Module({
  imports: [BaseModule, CatModule],
  controllers: [AppController],
  providers: [ChatgptService, AppService, GPTProviderService],
})
export class AppModule {}
