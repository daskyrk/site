import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ImageDto, QueryImageDto } from './dto/image.dto';

import { AuthGuard } from '@/core/guards';
import { ImageService } from './image.service';

@Controller('image')
export class ImageController {
  constructor(private readonly service: ImageService) {}

  @Post()
  @UseGuards(AuthGuard)
  public create(@Body() imageDto: ImageDto) {
    return this.service.create(imageDto);
  }

  @Get()
  public search(@Query() query: QueryImageDto) {
    return this.service.search(query);
  }
}
