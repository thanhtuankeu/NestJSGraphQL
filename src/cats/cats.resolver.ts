import { NotFoundException } from '@nestjs/common';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CatsService } from 'src/service/cat.service';
import { HumansService } from 'src/service/human.service';
import { Cats } from './cat.entities';
import { Humans } from './human/human.entities';

@Resolver(() => Cats)
export class CatsResolver {
  constructor(
    readonly catsService: CatsService,
    readonly humanService: HumansService,
  ) {}

  @Query(() => [Cats])
  async getAllCat() {
    return await this.catsService.findAll();
  }

  @Query(() => Cats)
  async cat(@Args('id') id: number): Promise<Cats> {
    const recipe = await this.catsService.findOne(id);
    if (!recipe) {
      throw new NotFoundException(id);
    }
    return recipe;
  }

}
