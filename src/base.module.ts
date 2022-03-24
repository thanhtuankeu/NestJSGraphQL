/*
https://docs.nestjs.com/modules
*/

import { Global, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from '@svtslv/nestjs-ioredis';
import { Cats } from './cats/cat.entities';
import { Humans } from './cats/human/human.entities';
import { Url } from './cats/url/url.entities';
import { RedisCachedService } from './service/rediscached.service';

@Global()
@Module({
  imports: [
    RedisModule.forRootAsync({
      useFactory: () => ({
        config: {
          url: process.env.REDIS_URL,
        },
      }),
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Cats, Humans],
      synchronize: true,
      ssl: {
        rejectUnauthorized: false,
      },
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([Cats, Humans, Url]),
  ],
  exports: [TypeOrmModule, RedisCachedService],
  providers: [RedisCachedService],
})
export class BaseModule {}
