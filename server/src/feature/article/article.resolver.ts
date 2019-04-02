import { Request } from 'express';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ArticleService } from './article.service';
import { ArticleInfoDto, QueryArticleDto } from './dto/article.dto';

@Resolver('Article')
export class ArticleResolver {
  constructor(private readonly articleService: ArticleService) {}

  @Query()
  public getArticleById(@Args('_id') _id: string) {
    return this.articleService.getArticleById(_id);
  }

  @Query()
  public getArticles(@Args() query: QueryArticleDto, @Context('request') request: Request) {
    // TODO: use @Header
    const token = request.headers.authorization;

    if (!token) {
      query.state = 1;
      query.publish = true;
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
