import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Tap } from '../taps/tap.model';
import { User } from '../users/user.model';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.reviews)
  user: User;

  @ManyToOne(() => Tap, (tap) => tap.reviews)
  tap: Tap;

  @Column({ type: 'text', nullable: true })
  comment: string;

  @Column({ type: 'int' })
  rating: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
