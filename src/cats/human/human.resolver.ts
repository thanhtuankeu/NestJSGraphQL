import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { HumansService } from 'src/service/human.service';
import { Cats } from '../cat.entities';
import { Humans } from './human.entities';

@Resolver(() => Humans)
export class HumansResolver {
  constructor(private humanService: HumansService) {}

  @Query(() => [Humans], { name: 'getAllHuman' })
  findAll() {
    return this.humanService.findAll();
  }

  @Query(() => Humans)
  findOne(@Args('id') id: number) {
    return this.humanService.findOne(id);
  }

  @ResolveField(() => Humans)
  project(@Parent() cat: Cats) {
    return this.humanService.getCat(cat.catID);
  }
}
