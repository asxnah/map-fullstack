import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Source } from './source.entity';
import { SourceDto } from './source.dto';

@Injectable()
export class SourcesService {
  constructor(
    @InjectRepository(Source)
    private sourceRepository: Repository<Source>,
  ) {}

  findAll(): Promise<Source[]> {
    return this.sourceRepository.find();
  }

  async save(source: SourceDto) {
    return this.sourceRepository.save(source);
  }

  async update(id: string, source: SourceDto) {
    const data = await this.sourceRepository.preload({
      id,
      ...source,
    });
    if (data) return this.sourceRepository.save(data);
  }

  async delete(id: string) {
    return this.sourceRepository.delete(id);
  }
}
