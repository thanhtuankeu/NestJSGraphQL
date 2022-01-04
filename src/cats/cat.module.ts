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
      type: 'postgres',
      host: process.env.localhost,
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
    TypeOrmModule.forFeature([Cats, Humans]),
  ],
  controllers: [],
  providers: [CatsResolver, CatsService, HumansService, HumansResolver],
})
export class CatModule { }
