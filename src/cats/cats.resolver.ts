import { Args, Query, Resolver } from '@nestjs/graphql';
import { CatsService } from 'src/service/cat.service';
import { HumansService } from 'src/service/human.service';
import { Cats } from './cat.entities';

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

  @Query(() => Cats, { name: 'cats' })
  findOne(@Args('id') id: number) {
    return this.catsService.findOne(id);
  }
}
