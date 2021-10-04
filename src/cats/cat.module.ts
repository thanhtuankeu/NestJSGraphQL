/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsService } from 'src/service/cat.service';
import { HumansService } from 'src/service/human.service';
import { Cats } from './cat.entities';
import { CatsResolver } from './cats.resolver';
import { Humans } from './human/human.entities';
import { HumansResolver } from './human/human.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.localhost,
      port: 3306,
      username: 'tuan',
      password: '1234',
      database: 'test',
      entities: [Cats, Humans],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Cats, Humans]),
  ],
  controllers: [],
  providers: [CatsResolver, CatsService, HumansService, HumansResolver],
})
export class CatModule {}
