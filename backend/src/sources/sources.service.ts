import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Source } from 'src/source.entity';

@Injectable()
export class SourcesService {
  constructor(
    @InjectRepository(Source)
    private sourceRepository: Repository<Source>,
  ) {}

  findAll(): Promise<Source[]> {
    return this.sourceRepository.find();
  }

  async add(source: {
    id: string;
    title: string;
    latitude: number;
    longitude: number;
    email: string;
    tel: string;
    workingHours: string;
    company: string;
  }) {
    return this.sourceRepository.save(source);
  }

  async edit(
    id: string,
    source: {
      title: string;
      latitude: number;
      longitude: number;
      email: string;
      tel: string;
      workingHours: string;
      company: string;
    },
  ) {
    await this.sourceRepository.update(id, source);
  }
}
