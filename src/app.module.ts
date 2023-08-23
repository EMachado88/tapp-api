import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TapsModule } from './taps/taps.module';
import { ReviewsModule } from './reviews/reviews.module';

ConfigModule.forRoot({ isGlobal: true });

const dbURL = process.env.DB_URL;

if (!dbURL) {
  throw new Error('DB_URL not found in environment');
}

@Module({
  imports: [MongooseModule.forRoot(dbURL), UsersModule, AuthModule, TapsModule, ReviewsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
