import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cats } from 'src/cats/cat.entities';
import { Humans } from 'src/cats/human/human.entities';
import { Repository } from 'typeorm';
import { CatsService } from './cat.service';

@Injectable()
export class HumansService {
  constructor(
    @InjectRepository(Humans)
    private humanRepository: Repository<Humans>,
    private catService: CatsService,
  ) {}

  createUpdateHumans(cat: Humans): Promise<Humans> {
    return this.humanRepository.save(cat);
  }

  findAll(): Promise<Humans[]> {
    return this.humanRepository.find({
      relations: ['cats'],
    });
  }

  findOne(id: number): Promise<Humans> {
    return this.humanRepository.findOne(id, { relations: ['cats'] });
  }

  async getCat(id: number): Promise<Cats> {
    return this.catService.findOne(id);
  }
}
