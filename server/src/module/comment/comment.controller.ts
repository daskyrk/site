import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentDto } from './dto/comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly CommentService: CommentService) {}

  @Post()
  public create(@Body() commentDto: CommentDto) {
    return this.CommentService.create(commentDto);
  }

  @Get()
  public getAll() {
    return this.CommentService.getAll();
  }

  @Get(':id')
  public findOne(@Param('id') id: string) {
    return this.CommentService.getById(id);
  }

  @Put()
  public update(@Body() commentDto: CommentDto) {
    return this.CommentService.update(commentDto);
  }

  @Delete(':id')
  public remove(@Param('id') id: string) {
    return this.CommentService.delete(id);
  }
}
