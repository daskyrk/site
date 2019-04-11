import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { QueryTagDto, TagDto } from './dto/tag.dto';

import { AuthGuard } from '@/core/guards';
import { TagService } from './tag.service';

@Controller('tag')
export class TagController {
  constructor(private readonly service: TagService) {}

  @Post()
  @UseGuards(AuthGuard)
  public create(@Body() tagDto: TagDto) {
    return this.service.create(tagDto);
  }

  @Get()
  public search(@Query() query: QueryTagDto) {
    return this.service.search(query);
  }

  @Put()
  @UseGuards(AuthGuard)
  public update(@Body() tagDto: TagDto) {
    return this.service.update(tagDto);
  }

  @Delete()
  @UseGuards(AuthGuard)
  public remove(@Query('id') id: string) {
    return this.service.delete(id);
  }
}
