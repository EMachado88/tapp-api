import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// import { Review } from '../schemas/review';

export type TapDocument = Tap & Document;

@Schema()
export class Tap {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  latitude: number;

  @Prop({ required: true })
  longitude: number;

  @Prop({ default: false })
  active: boolean;

  // @Prop()
  // reviews: Array<Review>;

  @Prop({ default: new Date() })
  createdAt: Date;

  @Prop({ default: new Date() })
  updatedAt: Date;
}

export const TapSchema = SchemaFactory.createForClass(Tap);