import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Tap, TapDocument } from './tap.model';

@Injectable()
export class TapsService {
  constructor(
    @InjectModel(Tap.name) private readonly tapModel: Model<TapDocument>,
  ) {}

  getAll(): Promise<Tap[]> {
    return this.tapModel.find({});
  }

  create(payload: any): Promise<Tap> {
    const { latitude, longitude } = payload;

    const tap = new this.tapModel({
      latitude,
      longitude,
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return tap.save();
  }
}
