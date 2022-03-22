import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Url } from 'src/cats/url/url.entities';
import { CreateUrlInput } from 'src/cats/url/url.input';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class urlsService {
  constructor(
    @InjectRepository(Url)
    private urlRepository: Repository<Url>,
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
    //get last 6 characters of hash
    return hash.substring(hash.length - 6);
  }

  /**
   * find url encoded
   * @param urlShort
   * @returns
   */
  async findOneURL(urlShort: string): Promise<Url> {
    const result = await this.urlRepository.findOne({ shortURL: urlShort });
    if (result) {
      return result;
    } else {
      throw new Error('Record not found');
    }
  }
}
