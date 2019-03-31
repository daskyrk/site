import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleInfoDto, QueryArticleDto } from './dto/article.dto';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  public create(@Body() articleInfoDto: ArticleInfoDto) {
    return this.articleService.create(articleInfoDto);
  }

  @Get(':id')
  public getArticleById(@Param('id') id: string) {
    return this.articleService.getArticleById(id);
  }

  @Get()
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
