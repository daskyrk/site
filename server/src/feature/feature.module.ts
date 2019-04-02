import { ArticleModule } from '@/feature/article/article.module';
import { CommentModule } from '@/feature/comment/comment.module';
import { Module } from '@nestjs/common';
import { SharedModule } from '@/shared/shared.module';
// import { LoggerModule } from './common/logger/logger.module';
import { TagModule } from '@/feature/tag/tag.module';
import { UserModule } from '@/feature/user/user.module';

/**
 * 包含所有的业务模块
 */
@Module({
  imports: [SharedModule, UserModule, ArticleModule, CommentModule, TagModule],
  exports: [UserModule, ArticleModule, CommentModule, TagModule],
})
export class FeatureModule {}
