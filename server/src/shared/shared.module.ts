import { GraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import config from '@/config';

@Module({
  imports: [
    // GraphQLModule.forRoot({
    //   typePaths: ['./**/*.graphql'],
    //   // debug: false,
    //   // playground: false,
    // }),
    MongooseModule.forRoot(config.MONGO_URI),
  ],
})
export class SharedModule {}
