/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRedis, Redis } from '@svtslv/nestjs-ioredis';

@Injectable()
export class RedisCachedService {
  EXPIRE_TIME = 1000;

  constructor(@InjectRedis() private readonly redis: Redis) {}

  async get(key: string) {
    try {
      const redisData = await this.redis.get(key);
      return redisData;
    } catch (err) {
      console.log(err);
    }
  }
  async set(key: string, value: string): Promise<string> {
    try {
      return await this.redis.set(key, value, { ttl: this.EXPIRE_TIME });
    } catch (err) {
      console.log(err);
    }
    console.log('set', key, value);
  }
}
