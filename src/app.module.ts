import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TapsModule } from './taps/taps.module';
import { ReviewsModule } from './reviews/reviews.module';

ConfigModule.forRoot({ isGlobal: true });

const dbUrl = process.env.DB_URL;
const dbPort = process.env.DB_PORT;
const dbUser = process.env.DB_USER;
const dbPwd = process.env.DB_PWD;

if (!dbUrl || !dbPort || !dbUser || !dbPwd) {
  throw new Error('DB variables not set in environment');
}

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: dbUrl,
      port: parseInt(dbPort || '5432'),
      username: dbUser,
      password: dbPwd,
      entities: [__dirname + '/**/*.model{.ts,.js}'],
      synchronize: process.env.NODE_ENV !== 'production',
    }),
    UsersModule,
    AuthModule,
    TapsModule,
    ReviewsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
