import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TagDto } from './dto/tag.dto';
import { TagService } from './tag.service';

@Controller('tag')
export class TagController {
  constructor(private readonly service: TagService) {}

  @Post()
  public create(@Body() tagDto: TagDto) {
    return this.service.create(tagDto);
  }

  @Get()
  public search(@Param('key') key: string) {
    return this.service.search(key);
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
