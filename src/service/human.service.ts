import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cats } from 'src/cats/cat.entities';
import { Humans } from 'src/cats/human/human.entities';
import { CreateHumanInput } from 'src/cats/human/human.input';
import { Repository } from 'typeorm';
import { CatsService } from './cat.service';

@Injectable()
export class HumansService {
  constructor(
    @InjectRepository(Humans)
    private humanRepository: Repository<Humans>,
    private catService: CatsService,
  ) {}

  async create(_human: CreateHumanInput): Promise<Humans> {
    const record = await this.humanRepository.find({ name: _human.name });
    if (record.length > 0) throw new Error('record existed');
    return this.humanRepository.save(_human); //you can directly use this without create. depends on DTO. this explained in video
  }

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
