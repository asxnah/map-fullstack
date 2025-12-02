import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';

import { SourcesService } from './sources.service';
import { Source } from 'src/source.entity';

@Controller('sources')
export class SourcesController {
  constructor(private readonly sourcesService: SourcesService) {}

  @Get()
  getAll(): Promise<Source[]> {
    return this.sourcesService.findAll();
  }

  @Post()
  add(
    @Body()
    source: {
      id: string;
      title: string;
      latitude: number;
      longitude: number;
      email: string;
      tel: string;
      workingHours: string;
      company: string;
    },
  ) {
    return this.sourcesService.add(source);
  }

  @Patch(':id')
  edit(
    @Param('id') id: string,
    @Body()
    source: {
      id: string;
      title: string;
      latitude: number;
      longitude: number;
      email: string;
      tel: string;
      workingHours: string;
      company: string;
    },
  ) {
    return this.sourcesService.edit(id, source);
  }
}
