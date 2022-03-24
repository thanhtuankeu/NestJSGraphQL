import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Url } from 'src/cats/url/url.entities';
import { CreateUrlInput } from 'src/cats/url/url.input';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RedisCachedService } from './rediscached.service';

@Injectable()
export class urlsService {
  constructor(
    @InjectRepository(Url)
    private urlRepository: Repository<Url>,
    private readonly redisCachedService: RedisCachedService,
  ) { }

  // create a new URL
  async create(_url: CreateUrlInput): Promise<Url> {
    const urlOb = {
      link: _url.link,
      shortURL: await this.generateshortURL(_url.link),
    };
    return this.urlRepository.save(urlOb);
  }
  findAll() {
    return this.urlRepository.find();
  }

  /**
   * returns the short url
   * @param url : string
   * @returns string url short
   */
  async generateshortURL(url: string) {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(url, saltOrRounds);
    const key = hash.substring(hash.length - 6);
    // save to redis
    this.redisCachedService.set(key, url);
    //get last 6 characters of hash
    return key;
  }

  /**
   * check redis if not query then store redis. then response
   * @param urlShort
   * @returns
   */
  async findOneURL(urlShort: string): Promise<Url> {
    const redisCheck = await this.redisCachedService.get(urlShort);
    if (redisCheck != null) {
      console.log('data from redis', redisCheck);
      return {
        link: redisCheck.toString(),
        shortURL: urlShort,
      };
    }
    const result = await this.urlRepository.findOne({ shortURL: urlShort });
    if (result) {
      this.redisCachedService.set(urlShort, result.link);
      return result;
    } else {
      throw new Error('Record not found');
    }
  }
}
