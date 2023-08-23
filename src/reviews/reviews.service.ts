import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Review, ReviewDocument } from './review.model';
import { Tap, TapDocument } from 'src/taps/tap.model';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review.name)
    private readonly reviewsModel: Model<ReviewDocument>,
    @InjectModel(Tap.name)
    private readonly tapsModel: Model<TapDocument>,
  ) {}

  async create(payload: any) {
    const review = await this.reviewsModel.create(payload);

    const tap = await this.tapsModel.findById(payload.tap);
    tap.reviews.push(review._id);
    tap.save();

    return review;
  }

  update(payload: any) {
    return this.reviewsModel.findByIdAndUpdate(payload._id, payload, {
      new: true,
    });
  }

  getMany(query?: any) {
    return this.reviewsModel.find(query);
  }

  getOne(id: string) {
    return this.reviewsModel.findById(id);
  }

  async clear() {
    const taps = await this.tapsModel.find();

    taps.forEach(async (tap) => {
      tap.reviews = [];
      tap.save();
    });

    return this.reviewsModel.deleteMany({});
  }
}
