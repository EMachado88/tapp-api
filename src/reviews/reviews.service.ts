import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Review } from './review.model';
import { Tap } from '../taps/tap.model';
import { User } from '../users/user.model';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewsRepository: Repository<Review>,
    @InjectRepository(Tap)
    private readonly tapsRepository: Repository<Tap>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(payload: any) {
    const review = new Review();

    const user = await this.usersRepository.findOne({
      where: { id: payload.userId },
    });

    review.user = user;
    review.tap = payload.tap;
    review.comment = payload.comment;
    review.rating = payload.rating;

    this.reviewsRepository.save(review);

    const tap = await this.tapsRepository.findOne({
      where: { id: payload.tap },
      relations: ['reviews'],
    });

    tap.reviews.push(review);

    this.tapsRepository.save(tap);

    return review;
  }

  async update(payload: any) {
    const review = await this.reviewsRepository.findOneBy({ id: payload.id });

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    if (payload.comment) review.comment = payload.comment;
    if (payload.rating) review.rating = payload.rating;
    review.updatedAt = new Date();

    return this.reviewsRepository.save(review);
  }

  getMany(query?: any) {
    return this.reviewsRepository.find(query);
  }

  getOne(id: number) {
    return this.reviewsRepository.findOneBy({ id });
  }
}
