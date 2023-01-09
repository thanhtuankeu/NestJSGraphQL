/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseModule } from 'src/base.module';
import { CatsService } from 'src/service/cat.service';
import { HumansService } from 'src/service/human.service';
import { urlsService } from 'src/service/url.service';
import { Cats } from './cat.entities';
import { CatsResolver } from './cats.resolver';
import { Humans } from './human/human.entities';
import { HumansResolver } from './human/human.resolver';
import { urlsResolver } from '../url/url.resolver';

@Module({
  imports: [BaseModule],

  controllers: [],
  providers: [
    CatsResolver,
    HumansResolver,
    urlsResolver,
    CatsService,
    HumansService,
    urlsService,
  ],
})
export class CatModule {}
