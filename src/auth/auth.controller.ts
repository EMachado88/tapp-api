import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';

import { AuthGuard } from '@nestjs/passport';

interface LoginUser {
  email: string;
  password: string;
}

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('auth/login')
  @UseGuards(AuthGuard('local'))
  async login(@Request() req: Request & { user: LoginUser }) {
    return this.authService.login(req.body);
  }
}
