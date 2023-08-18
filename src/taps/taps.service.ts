import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Tap, TapDocument } from './tap.model';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class TapsService {
  geocodingApiUrl: string;
  geocodingApiKey: string;

  constructor(
    @InjectModel(Tap.name) private readonly tapModel: Model<TapDocument>,
    private readonly httpService: HttpService,
  ) {
    this.geocodingApiUrl = process.env.GEOCODING_API_URL;
    this.geocodingApiKey = process.env.GEOCODING_API_KEY;

    console.log(this.geocodingApiUrl, this.geocodingApiKey);
  }

  getAll(): Promise<Tap[]> {
    return this.tapModel.find({});
  }

  create(payload: any): any {
    const { latitude, longitude } = payload;

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

        return tap.save();
      });
  }
}
