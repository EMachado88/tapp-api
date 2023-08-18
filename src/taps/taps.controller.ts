import { Controller, Get } from '@nestjs/common';

import { TapsService } from './taps.service';

@Controller('taps')
export class TapsController {
  constructor(private readonly tapsService: TapsService) {}

  @Get()
  findAll() {
    return this.tapsService.getAll();
  }
}
