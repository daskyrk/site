import { AuthGuard, RolesGuard } from '@/core/guards';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { PostInfoDto, QueryPostDto } from './dto/post.dto';

import { PostService } from './post.service';
import { PostState } from './interface/post.interface';
import { Request } from "express";

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseGuards(AuthGuard)
  public create(@Body() postInfoDto: PostInfoDto) {
    return this.postService.create(postInfoDto);
  }

  @Get(':id')
  public getPostById(@Param('id') id: string) {
    return this.postService.getPostById(id);
  }

  @Get()
  public searchPosts(@Query() query: QueryPostDto, @Req() req: Request) {
    if (!req.user) {
      console.log('not login:');
      query.state = PostState.RELEASE;
      query.public = true;
    }
    return this.postService.search(query);
  }

  @Put()
  @UseGuards(AuthGuard)
  public updatePost(@Body() postInfoDto: PostInfoDto) {
    return this.postService.update(postInfoDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  public deletePost(@Param('id') id: string) {
    return this.postService.delete(id);
  }
}
