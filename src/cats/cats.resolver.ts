import { NotFoundException } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { CatsService } from 'src/service/cat.service';
import { CatsDTO } from './cat.dto';
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

  @Query(() => [CatsDTO])
  async getAllCat() {
    return await this.catsService.findAll();
  }

  @Query(() => CatsDTO)
  async find(@Args('id') id: number): Promise<CatsDTO> {
    const recipe = await this.catsService.findOne(id);
    if (!recipe) {
      throw new NotFoundException(id);
    }
    return recipe;
  }
}
