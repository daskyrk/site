import { ArticleInfoDto, QueryArticleDto } from './dto/article.dto';
import { AuthGuard, RolesGuard } from '@/core/guards';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { Roles, RolesEnum } from '@/core/decorators';

import { ArticleService } from './article.service';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  // @Roles(RolesEnum.Admin)
  @UseGuards(AuthGuard)
  public create(@Body() articleInfoDto: ArticleInfoDto) {
    return this.articleService.create(articleInfoDto);
  }

  @Get(':id')
  public getArticleById(@Param('id') id: string) {
    return this.articleService.getArticleById(id);
  }

  @Get()
  @UseGuards(AuthGuard)
  public searchArticles(@Query() query: QueryArticleDto) {
    return this.articleService.search(query);
  }

  @Put()
  public updateArticle(@Body() articleInfoDto: ArticleInfoDto) {
    return this.articleService.update(articleInfoDto);
  }

  @Delete(':id')
  public deleteArticle(@Param('id') id: string) {
    return this.articleService.delete(id);
  }
}
