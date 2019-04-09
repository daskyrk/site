import { CommentModule } from '@/feature/comment/comment.module';
import { ImageModule } from '@/feature/image/image.module';
import { Module } from '@nestjs/common';
import { PostModule } from '@/feature/post/post.module';
import { SharedModule } from '@/shared/shared.module';
// import { LoggerModule } from './common/logger/logger.module';
import { TagModule } from '@/feature/tag/tag.module';
import { UserModule } from '@/feature/user/user.module';
import { WishModule } from '@/feature/wish/wish.module';

/**
 * 包含所有的业务模块
 */
@Module({
  imports: [SharedModule, UserModule, PostModule, CommentModule, TagModule, ImageModule, WishModule],
  exports: [UserModule, PostModule, CommentModule, TagModule, ImageModule, WishModule],
})
export class FeatureModule { }
