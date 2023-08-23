import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';

import { TapsController } from './taps.controller';
import { TapsService } from './taps.service';
import { Tap, TapSchema } from './tap.model';
import { JwtStrategy } from '../auth/jwt.auth';
import { Review, ReviewSchema } from '../reviews/review.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Tap.name, schema: TapSchema },
      { name: Review.name, schema: ReviewSchema },
    ]),
    HttpModule,
  ],
  controllers: [TapsController],
  providers: [TapsService, JwtStrategy],
})
export class TapsModule {}
