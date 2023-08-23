import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HttpService } from '@nestjs/axios';

import { Tap, TapDocument } from './tap.model';
import { Review, ReviewDocument } from '../reviews/review.model';

@Injectable()
export class TapsService {
  geocodingApiUrl: string;
  geocodingApiKey: string;

  constructor(
    @InjectModel(Tap.name) private readonly tapModel: Model<TapDocument>,
    @InjectModel(Review.name)
    private readonly reviewModel: Model<ReviewDocument>,
    private readonly httpService: HttpService,
  ) {
    this.geocodingApiUrl = process.env.GEOCODING_API_URL;
    this.geocodingApiKey = process.env.GEOCODING_API_KEY;
  }

  async getOne(query: any): Promise<Tap> {
    const tap = await this.tapModel.findOne(query).select('-__v -updatedAt');

    tap.reviews = await this.reviewModel
      .find({ _id: { $in: tap.reviews } })
      .select('-__v -tapId -updatedAt')
      .populate({
        path: 'user',
        select:
          '-__v -password -isAdmin -isVerified -isDeleted -createdAt -updatedAt',
      });

    return tap;
  }

  async getAll(): Promise<Tap[]> {
    const taps = await this.tapModel.find().select('-__v -updatedAt');

    await Promise.all(
      taps.map(async (tap: Tap) => {
        tap.reviews = await this.reviewModel
          .find({ _id: { $in: tap.reviews } })
          .select('-__v -tapId -updatedAt')
          .populate({
            path: 'user',
            select:
              '-__v -password -isAdmin -isVerified -isDeleted -createdAt -updatedAt',
          });
      }),
    );

    return taps;
  }

  create(payload: any): any {
    const { latitude, longitude } = payload;

    const savedTap = this.getOne({ latitude, longitude });
    if (savedTap) return;

    this.httpService
      .get(
        `${this.geocodingApiUrl}?lat=${latitude}&lon=${longitude}&apiKey=${this.geocodingApiKey}`,
      )
      .pipe()
      .subscribe((response) => {
        const { name, city } = response.data.features?.[0]?.properties;

        const tap = new this.tapModel({
          address: `${name}, ${city}`,
          latitude,
          longitude,
          active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        tap.save();
      });

    return { message: 'Tap created successfully' };
  }
}
