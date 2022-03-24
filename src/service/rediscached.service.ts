/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRedis, Redis } from '@svtslv/nestjs-ioredis';

@Injectable()
export class RedisCachedService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async get(key: string) {
    const redisData = await this.redis.get(key);
    return redisData;
  }
  async set(key: string, value: string): Promise<string> {
    console.log('set', key, value);
    return this.redis.set(key, value);
  }
}
