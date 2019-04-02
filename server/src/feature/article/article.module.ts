import { HttpModule, Module } from '@nestjs/common';

import { ArticleController } from './article.controller';
import { ArticleSchema } from './schema/article.schema';
// import { ArticleResolver } from './article.resolver';
import { ArticleService } from './article.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Article', schema: ArticleSchema }]),
  ],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
