import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from 'src/service/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  testAPI(): string {
    return this.appService.getHello();
  }
}
