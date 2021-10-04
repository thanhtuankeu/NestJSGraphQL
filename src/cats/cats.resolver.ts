import { NotFoundException } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { CatsService } from 'src/service/cat.service';
import { Cats } from './cat.entities';

@Resolver()
export class CatsResolver {
  constructor(readonly catsService: CatsService) {}
  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
  @Query(() => String)
  sayHeho(): string {
    return 'sayHeho!';
  }

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
