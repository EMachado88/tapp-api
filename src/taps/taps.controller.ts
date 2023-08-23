import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { TapsService } from './taps.service';

@Controller('taps')
export class TapsController {
  constructor(private readonly tapsService: TapsService) {}

  @Get()
  async findAll() {
    return await this.tapsService.getAll();
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return await this.tapsService.getOne({ _id: id });
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Request() req: Request) {
    return await this.tapsService.create(req.body);
  }
}
