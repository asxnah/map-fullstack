import { Controller, Get } from '@nestjs/common';

import { SourcesService } from './sources.service';
import { Source } from 'src/source.entity';

@Controller('sources')
export class SourcesController {
  constructor(private readonly sourcesService: SourcesService) {}

  @Get()
  getAll(): Promise<Source[]> {
    return this.sourcesService.findAll();
  }
}
