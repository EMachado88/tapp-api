import { Controller, Request, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

interface LoginUser {
  username: string;
  password: string;
}

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('auth/login')
  async login(@Request() req: Request & { user: LoginUser }) {
    return this.authService.login(req.body);
  }
}
