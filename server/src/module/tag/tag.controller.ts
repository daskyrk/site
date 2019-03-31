import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { QueryTagDto, TagDto } from './dto/tag.dto';
import { TagService } from './tag.service';

@Controller('tag')
export class TagController {
  constructor(private readonly service: TagService) {}

  @Post()
  public create(@Body() tagDto: TagDto) {
    return this.service.create(tagDto);
  }

  @Get()
  public search(@Query() query: QueryTagDto) {
    return this.service.search(query);
  }

  @Put()
  public update(@Body() tagDto: TagDto) {
    return this.service.update(tagDto);
  }

  @Delete(':id')
  public remove(@Param('id') id: string) {
    return this.service.delete(id);
  }

}
