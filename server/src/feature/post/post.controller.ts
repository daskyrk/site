import { AuthGuard, RolesGuard } from '@/core/guards';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { PostInfoDto, QueryPostDto } from './dto/post.dto';

import { PostService } from './post.service';
import { Request } from "express";

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Post()
  @UseGuards(AuthGuard)
  public create(@Body() postInfoDto: PostInfoDto) {
    return this.postService.create(postInfoDto);
  }

  @Get()
  public searchPosts(@Query() query: QueryPostDto, @Req() req: Request) {
    const isAdmin = !!req.user;
    if (!isAdmin) {
      query.isPublish = true;
      query.isPublic = true;
    }
    if (query.id) {
      return this.postService.getPostById(query.id, isAdmin);
    }
    return this.postService.search(query);
  }

  @Get('types')
  public getPostTypes() {
    return this.postService.getTypes();
  }

  @Put()
  @UseGuards(AuthGuard)
  public updatePost(@Body() postInfoDto: PostInfoDto) {
    return this.postService.update(postInfoDto);
  }

  @Delete()
  @UseGuards(AuthGuard)
  public deletePost(@Query('id') id: string) {
    return this.postService.delete(id);
  }

  @Put('/like')
  public likePost(@Query('id') id: string) {
    return this.postService.likePost(id);
  }
}
