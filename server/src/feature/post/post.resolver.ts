import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostInfoDto, QueryPostDto } from './dto/post.dto';

import { PostService } from './post.service';
import { Request } from 'express';

@Resolver('Post')
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query()
  public getPostById(@Args('_id') _id: string) {
    return this.postService.getPostById(_id);
  }

  @Query()
  public getPosts(@Args() query: QueryPostDto, @Context('request') request: Request) {
    if (!request.user) {
      console.log('not login:');
      query.state = 1;
      query.public = true;
    }
    return this.postService.search(query);
  }

  @Mutation()
  // @Permissions()
  public createPost(@Args('postInfo') info: PostInfoDto) {
    return this.postService.create(info);
  }

  @Mutation()
  // @Permissions()
  public updatePost(@Args('postInfo') info: PostInfoDto) {
    return this.postService.update(info);
  }

  @Mutation()
  // @Permissions()
  public deletePost(@Args('_id') id: string) {
    return this.postService.delete(id);
  }
}
