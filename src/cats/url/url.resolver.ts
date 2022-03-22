import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { urlsService } from 'src/service/url.service';
import { Url } from './url.entities';
import { CreateUrlInput } from './url.input';

@Resolver(() => Url)
export class urlsResolver {
  constructor(private urlService: urlsService) { }

  @Mutation(() => Url)
  createUrl(@Args('data') data: CreateUrlInput) {
    return this.urlService.create(data);
  }

  @Query(() => [Url], { name: 'getAllurl' })
  findAll() {
    return this.urlService.findAll();
  }

  @Query(() => Url, { name: 'queryUrl' })
  queryURL(@Args('urlShort', { type: () => String }) urlShort: string) {
    return this.urlService.findOneURL(urlShort);
  }
}
