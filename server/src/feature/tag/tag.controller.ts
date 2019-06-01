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
import { PostService } from '../post/post.service';
import { Types } from 'mongoose';

@Controller('tag')
export class TagController {
  constructor(
    private readonly service: TagService,
    private readonly postService: PostService,
  ) { }

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
  public async clean() {
    const removedTags = await this.service.cleanTags();
    // 删除所有文章中tags列表中的匹配值
    removedTags.forEach(async (tag: any) => {
      const tagId = tag._id.toString();
      const postContainMatchTag = await this.postService.findAll({ tags: Types.ObjectId(tagId) })
      postContainMatchTag.forEach(async post => {
        post.tags = post.tags.filter(tid => {
          return tid.toString() !== tagId
        })
        await post.save();
      })
    })
    return removedTags;
  }
}
