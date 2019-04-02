import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentDto, QueryCommentDto } from './dto/comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  public create(@Body() commentDto: CommentDto) {
    return this.commentService.create(commentDto);
  }

  @Get()
  public search(@Query() query: QueryCommentDto) {
    return this.commentService.search(query);
  }

  @Get(':id')
  public findOne(@Param('id') id: string) {
    return this.commentService.getById(id);
  }

  @Put()
  public update(@Body() commentDto: CommentDto) {
    return this.commentService.update(commentDto);
  }

  @Delete(':id')
  public remove(@Param('id') id: string) {
    return this.commentService.delete(id);
  }
}
