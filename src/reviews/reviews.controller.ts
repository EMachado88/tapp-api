import { Body, Controller, Post, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ReviewsService } from './reviews.service';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() payload: any) {
    return this.reviewsService.create(payload);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard('jwt'))
  update(@Body() payload: any) {
    return this.reviewsService.update(payload);
  }
}
