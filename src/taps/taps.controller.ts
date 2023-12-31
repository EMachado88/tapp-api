import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Param,
  Patch,
  Delete,
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
  async findOne(@Param('id') id: number) {
    return await this.tapsService.getOne({ id });
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Request() req: Request) {
    return await this.tapsService.create(req.body);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard('jwt'))
  async update(@Param('id') id: number, @Request() req: Request) {
    return await this.tapsService.update(id, req.body);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  async delete(@Param('id') id: number) {
    return await this.tapsService.delete(id);
  }
}
