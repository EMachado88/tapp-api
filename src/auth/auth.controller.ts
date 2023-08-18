import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';

import { LocalStrategy } from './local.auth';

interface LoginUser {
  email: string;
  password: string;
}

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('auth/login')
  @UseGuards(LocalStrategy)
  async login(@Request() req: Request & { user: LoginUser }) {
    return this.authService.login(req.body);
  }
}
