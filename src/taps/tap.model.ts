import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Review } from '../reviews/review.model';

@Entity()
export class Tap {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  address: string;

  @Column({ type: 'float' })
  latitude: number;

  @Column({ type: 'float' })
  longitude: number;

  @Column({ type: 'boolean' })
  active: boolean;

  @OneToMany(() => Review, (review) => review.tap)
  reviews: Review[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
