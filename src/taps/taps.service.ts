import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Tap, TapDocument } from './tap.model';

@Injectable()
export class TapsService {
  constructor(
    @InjectModel(Tap.name) private readonly tapModel: Model<TapDocument>,
  ) {}

  async getAll(): Promise<Tap[]> {
    return this.tapModel.find({});
  }
}
