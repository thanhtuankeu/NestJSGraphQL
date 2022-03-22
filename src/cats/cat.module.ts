/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsService } from 'src/service/cat.service';
import { HumansService } from 'src/service/human.service';
import { urlsService } from 'src/service/url.service';
import { Cats } from './cat.entities';
import { CatsResolver } from './cats.resolver';
import { Humans } from './human/human.entities';
import { HumansResolver } from './human/human.resolver';
import { Url } from './url/url.entities';
import { urlsResolver } from './url/url.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),
    TypeOrmModule.forRoot({
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
  controllers: [],
  providers: [
    CatsResolver,
    CatsService,
    HumansService,
    HumansResolver,
    urlsResolver,
    urlsService,
  ],
})
export class CatModule {}
