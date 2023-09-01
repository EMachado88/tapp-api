import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { Review } from './review.model';
import { Tap } from '../taps/tap.model';
import { User } from '../users/user.model';

@Module({
  imports: [TypeOrmModule.forFeature([Review, Tap, User])],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
