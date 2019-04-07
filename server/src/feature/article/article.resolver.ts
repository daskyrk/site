import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ArticleInfoDto, QueryArticleDto } from './dto/article.dto';

import { ArticleService } from './article.service';
import { Request } from 'express';

@Resolver('Article')
export class ArticleResolver {
  constructor(private readonly articleService: ArticleService) {}

  @Query()
  public getArticleById(@Args('_id') _id: string) {
    return this.articleService.getArticleById(_id);
  }

  @Query()
  public getArticles(@Args() query: QueryArticleDto, @Context('request') request: Request) {
    if (!request.user) {
      console.log('not login:');
      query.state = 1;
      query.public = true;
    }
    return this.articleService.search(query);
  }

  @Mutation()
  // @Permissions()
  public createArticle(@Args('articleInfo') info: ArticleInfoDto) {
    return this.articleService.create(info);
  }

  @Mutation()
  // @Permissions()
  public updateArticle(@Args('articleInfo') info: ArticleInfoDto) {
    return this.articleService.update(info);
  }

  @Mutation()
  // @Permissions()
  public deleteArticle(@Args('_id') id: string) {
    return this.articleService.delete(id);
  }
}
