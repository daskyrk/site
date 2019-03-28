import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
// import { AppController } from '../app.controller';
// import { AppService } from './app.service';
import { MONGODB } from '../config/config';
// import { ConfigModule } from './config/config.module';
// import { UserModule } from './user/user.module';
import { ArticleModule } from './article/article.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    // GraphQLModule.forRoot({
    //   typePaths: ['./**/*.graphql'],
    //   // debug: false,
    //   // playground: false,
    // }),
    // ConfigModule,
    MongooseModule.forRoot(MONGODB.uris),
    UserModule,
    ArticleModule,
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
