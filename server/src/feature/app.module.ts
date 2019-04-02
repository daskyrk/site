import { ArticleModule } from './article/article.module';
import { CommentModule } from './comment/comment.module';
import { GraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// import { LoggerModule } from './common/logger/logger.module';
import { TagModule } from './tag/tag.module';
import { UserModule } from './user/user.module';
import config from '@/config';

@Module({
  imports: [
    // GraphQLModule.forRoot({
    //   typePaths: ['./**/*.graphql'],
    //   // debug: false,
    //   // playground: false,
    // }),
    MongooseModule.forRoot(config.MONGO_URI),
    UserModule,
    ArticleModule,
    CommentModule,
    TagModule,
    // LoggerModule,
  ],
})
export class AppModule {}
