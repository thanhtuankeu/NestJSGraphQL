import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';
import { AppService } from 'src/service/app.service';
import { RedisCachedService } from 'src/service/rediscached.service';

class RedisPayload {
  @ApiProperty()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  key: string;
  @ApiProperty()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  value: string;
}

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly redisCachedService: RedisCachedService,
  ) { }

  @Get()
  testAPI(): string {
    return this.appService.getHello();
  }
  @Get('redis/:key')
  async testgetRedis(@Param('key') key: string) {
    return await this.redisCachedService.get(key);
  }
  @Post('redis')
  async testpushRedis(@Body() payload: RedisPayload): Promise<string> {
    return await this.redisCachedService.set(payload.key, payload.value);
  }
}
