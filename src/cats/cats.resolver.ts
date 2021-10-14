import { Args, Mutation, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CatsService } from 'src/service/cat.service';
import { HumansService } from 'src/service/human.service';
import { Cats } from './cat.entities';
import { CreateCatInput } from './cat.input';
import { Humans } from './human/human.entities';

@Resolver(() => Cats)
export class CatsResolver {
  constructor(
    readonly catsService: CatsService,
    readonly humanService: HumansService,
  ) {}

  /**
   * create Cat if name not existed
   * @param cat ; name, age
   * @returns cat Object
   */
  @Mutation(() => Cats)
  createCat(@Args('cat') cat: CreateCatInput) {
    return this.catsService.create(cat);
  }

  @Query(() => [Cats])
  async getAllCat() {
    return await this.catsService.findAll();
  }

  @Query(() => Cats, { name: 'cats' })
  findOne(@Args('id') id: number) {
    return this.catsService.findOne(id);
  }

}
