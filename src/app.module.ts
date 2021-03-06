import { BaseModule } from './base.module';
import { CatModule } from './cats/cat.module';
import { Module } from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { AppService } from './service/app.service';

@Module({
  imports: [BaseModule, CatModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
