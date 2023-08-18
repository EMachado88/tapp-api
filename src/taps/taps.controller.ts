import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';

import { TapsService } from './taps.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('taps')
export class TapsController {
  constructor(private readonly tapsService: TapsService) {}

  @Get()
  findAll() {
    return this.tapsService.getAll();
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Request() req: Request) {
    return this.tapsService.create(req.body);
  }
}
