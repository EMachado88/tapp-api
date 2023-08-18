import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';

import { TapsController } from './taps.controller';
import { TapsService } from './taps.service';
import { Tap, TapSchema } from './tap.model';
import { JwtStrategy } from 'src/auth/jwt.auth';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tap.name, schema: TapSchema }]),
    HttpModule,
  ],
  controllers: [TapsController],
  providers: [TapsService, JwtStrategy],
})
export class TapsModule {}
