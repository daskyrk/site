import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleController } from './article.controller';
// import { ArticleResolver } from './article.resolver';
import { ArticleService } from './article.service';
import { ArticleSchema } from './schema/article.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Article', schema: ArticleSchema }]),
  ],
  controllers: [ArticleController],
  providers: [ArticleService],
  // exports: [ArticleService],
})
export class ArticleModule {}
