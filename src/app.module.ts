import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

ConfigModule.forRoot();

const dbURL = process.env.DB_URL;

if (!dbURL) {
  throw new Error('DB_URL not found in environment');
}

@Module({
  imports: [MongooseModule.forRoot(dbURL), UsersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
