import { ArticleInfoDto, QueryArticleDto } from './dto/article.dto';
import { AuthGuard, RolesGuard } from '@/core/guards';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';

import { ArticleService } from './article.service';
import { ArticleState } from './interface/article.interface';
import { Request } from "express";

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  @UseGuards(AuthGuard)
  public create(@Body() articleInfoDto: ArticleInfoDto) {
    return this.articleService.create(articleInfoDto);
  }

  @Get(':id')
  public getArticleById(@Param('id') id: string) {
    return this.articleService.getArticleById(id);
  }

  @Get()
  public searchArticles(@Query() query: QueryArticleDto, @Req() req: Request) {
    if (!req.user) {
      console.log('not login:');
      query.state = ArticleState.RELEASE;
      query.public = true;
    }
    return this.articleService.search(query);
  }

  @Put()
  @UseGuards(AuthGuard)
  public updateArticle(@Body() articleInfoDto: ArticleInfoDto) {
    return this.articleService.update(articleInfoDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  public deleteArticle(@Param('id') id: string) {
    return this.articleService.delete(id);
  }
}
