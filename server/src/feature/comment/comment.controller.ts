import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommentDto, QueryCommentDto } from './dto/comment.dto';

import { AuthGuard } from '@/core/guards';
import { CommentService } from './comment.service';
import { Request } from "express";

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  public create(@Body() commentDto: CommentDto, @Req() req: Request) {
    return this.commentService.createComment(commentDto, req);
  }

  @Get()
  public search(@Query() query: QueryCommentDto) {
    return this.commentService.search(query);
  }

  @Get(':id')
  public findOne(@Param('id') id: string) {
    return this.commentService.findById(id);
  }

  @Put()
  public update(@Body() commentDto: CommentDto) {
    return this.commentService.update(commentDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  public remove(@Param('id') id: string) {
    return this.commentService.delete(id);
  }
}
