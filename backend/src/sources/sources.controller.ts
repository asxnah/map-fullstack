import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { SourcesService } from './sources.service';
import { Source } from 'src/source.entity';
import { SourceDto } from './source.dto';

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
    source: SourceDto,
  ) {
    return this.sourcesService.add(source);
  }

  @Patch(':id')
  edit(
    @Param('id') id: string,
    @Body()
    source: SourceDto,
  ) {
    return this.sourcesService.edit(id, source);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sourcesService.remove(id);
  }
}
