import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommentDto, QueryCommentDto } from './dto/comment.dto';

import { AuthGuard } from '@/core/guards';
import { CommentService } from './comment.service';
import { PostService } from '../post/post.service';
import { Request } from "express";

@Controller('comment')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    private readonly postService: PostService,
  ) { }

  @Get('delete')
  @UseGuards(AuthGuard)
  public async delete(@Query('id') id: string) {
    const result = await this.commentService.delete(id);
    if (result) {
      await this.postService.commentPost(result.postId, true);
    }
    return result ? '该评论已被删除' : '该评论删除失败';
  }

  @Get('forbid')
  @UseGuards(AuthGuard)
  public async forbid(@Query('id') id: string) {
    const result = await this.commentService.updateState(id, 2);
    return result ? '该评论已被屏蔽' : '该评论屏蔽失败';
  }

  @Post()
  public create(@Body() commentDto: CommentDto, @Req() req: Request) {
    const newComment = this.commentService.createComment(commentDto, req);
    if (newComment) {
      this.postService.commentPost(commentDto.post.id);
    }
    return newComment;
  }

  @Get()
  public search(@Query() query: QueryCommentDto, @Req() req: any) {
    const isAdmin = !!req.user;
    let select = {};
    if (!isAdmin) {
      select = {
        ip: 0,
        city: 0,
        country: 0,
        range: 0,
      }
      query.state = 1;
    }
    if (query.id) {
      return this.commentService.findById(query.id, select);
    }
    return this.commentService.search(query, select);
  }

  @Put()
  public update(@Body() commentDto: CommentDto) {
    return this.commentService.update(commentDto);
  }

  @Delete()
  @UseGuards(AuthGuard)
  public async remove(@Query('id') id: string) {
    const result = await this.commentService.delete(id);
    if (result) {
      await this.postService.commentPost(result.postId, true);
    }
    return result;
  }

  @Patch('like')
  public like(@Body('id') id: string) {
    return this.commentService.like(id);
  }
}
