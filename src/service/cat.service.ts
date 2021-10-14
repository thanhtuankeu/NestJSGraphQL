import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cats } from 'src/cats/cat.entities';
import { CreateCatInput } from 'src/cats/cat.input';
import { Repository } from 'typeorm';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cats)
    private catRepository: Repository<Cats>,
  ) {}

  async create(cat: CreateCatInput): Promise<Cats> {
    const record = await this.catRepository.find({ name: cat.name });
    if (record.length > 0) throw new Error('record existed');
    return this.catRepository.save(cat);
  }

  createUpdateCats(cat: Cats): Promise<Cats> {
    return this.catRepository.save(cat);
  }

  findAll(): Promise<Cats[]> {
    return this.catRepository.find({ relations: ['human'] });
  }

  findOne(id: number): Promise<Cats> {
    return this.catRepository.findOne({ catID: id }, { relations: ['human'] });
  }
}
