import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TapsController } from './taps.controller';
import { TapsService } from './taps.service';
import { Tap, TapSchema } from './tap.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: Tap.name, schema: TapSchema }])],
  controllers: [TapsController],
  providers: [TapsService],
})
export class TapsModule {}
