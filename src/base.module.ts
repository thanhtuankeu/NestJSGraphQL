/*
https://docs.nestjs.com/modules
*/

import { Global, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from '@svtslv/nestjs-ioredis';
import { Cats } from './cats/cat.entities';
import { Humans } from './cats/human/human.entities';
import { Url } from './url/url.entities';
import { RedisCachedService } from './service/rediscached.service';

@Global()
@Module({
  imports: [
    RedisModule.forRootAsync({
      useFactory: () => ({
        config: {
          url: process.env.REDIS_URL ? process.env.REDIS_URL : 'localhost:6379',
        },
      }),
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST ? process.env.DB_HOST : 'localhost',
      port: Number(process.env.DB_PORT) ? Number(process.env.DB_PORT) : 5432,
      username: process.env.DB_USER ? process.env.DB_USER : 'airflow',
      password: process.env.DB_PASSWORD ? process.env.DB_PASSWORD : 'airflow',
      database: process.env.DB_NAME ? process.env.DB_NAME : 'zoro',
      entities: [Cats, Humans],
      synchronize: true,
      autoLoadEntities: true,
      ssl: true,
    }),
    TypeOrmModule.forFeature([Cats, Humans, Url]),
  ],
  exports: [TypeOrmModule, RedisCachedService],
  providers: [RedisCachedService],
})
export class BaseModule {}
