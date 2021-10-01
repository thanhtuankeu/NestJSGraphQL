import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cats } from 'src/cats/cat.entities';
import { Repository } from 'typeorm';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cats)
    private catRepository: Repository<Cats>,
  ) {}

  createUpdateCats(cat: Cats): Promise<Cats> {
    return this.catRepository.save(cat);
  }

  findAll(): Promise<Cats[]> {
    return this.catRepository.find();
  }

  findOne(id: number): Promise<Cats> {
    return this.catRepository.findOne({ catID: id });
  }
}
