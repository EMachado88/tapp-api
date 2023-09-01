import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { TapsController } from './taps.controller';
import { TapsService } from './taps.service';
import { Tap } from './tap.model';
import { JwtStrategy } from '../auth/jwt.auth';
import { Review } from '../reviews/review.model';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Tap, Review]), HttpModule],
  controllers: [TapsController],
  providers: [TapsService, JwtStrategy],
})
export class TapsModule {}
