import { Injectable, NotAcceptableException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { firstValueFrom } from 'rxjs';

import { Tap } from './tap.model';
import { Review } from '../reviews/review.model';

interface TapQuery {
  id?: number;
  address?: string;
  latitude?: number;
  longitude?: number;
  active?: boolean;
}

@Injectable()
export class TapsService {
  geocodingApiUrl: string;
  geocodingApiKey: string;

  constructor(
    @InjectRepository(Tap) private readonly tapRepository: Repository<Tap>,
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    private readonly httpService: HttpService,
  ) {
    this.geocodingApiUrl = process.env.GEOCODING_API_URL;
    this.geocodingApiKey = process.env.GEOCODING_API_KEY;
  }

  async getOne(query: TapQuery): Promise<Tap> {
    return await this.tapRepository.findOne({
      where: { ...query },
      relations: ['reviews', 'reviews.user'],
    });
  }

  async getAll(): Promise<Tap[]> {
    return await this.tapRepository.find({
      relations: ['reviews', 'reviews.user'],
    });
  }

  async create(payload: any): Promise<Tap | NotAcceptableException> {
    const { latitude, longitude } = payload;

    const savedTap = await this.getOne({ latitude, longitude });
    if (savedTap) return new NotAcceptableException('Tap already exists');

    const response = await firstValueFrom(
      this.httpService.get(
        `${this.geocodingApiUrl}?lat=${latitude}&lon=${longitude}&apiKey=${this.geocodingApiKey}`,
      ),
    );

    const { name, city } = response.data.features?.[0]?.properties;

    const tap = new Tap();
    tap.address = `${name}, ${city}`;
    tap.latitude = latitude;
    tap.longitude = longitude;
    tap.active = false;
    tap.reviews = [];

    return this.tapRepository.save(tap);
  }

  async update(id: number, payload: any): Promise<Tap> {
    const tap = await this.getOne({ id });

    if (!tap) return;

    if (payload.latitude) tap.latitude = payload.latitude;
    if (payload.longitude) tap.longitude = payload.longitude;
    if (payload.address) tap.address = payload.address;
    tap.active = payload.active;
    tap.updatedAt = new Date();

    return await this.tapRepository.save(tap);
  }

  async delete(id: number): Promise<NotAcceptableException | DeleteResult> {
    const tap = await this.getOne({ id });
    if (!tap) return new NotAcceptableException(`Tap ${id} not found`);

    await this.reviewRepository.delete({ tap });

    return await this.tapRepository.delete({ id });
  }
}
