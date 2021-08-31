import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from 'src/service/app.service';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  postHello() {
    return {
      status: 'ok',
      data: {
        name: 'tuan',
        age: '19',
      },
    };
  }
}
