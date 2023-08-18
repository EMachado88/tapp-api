import { Injectable, NotAcceptableException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.getUser({ email });

    if (!user) return null;

    const passwordValid = await bcrypt.compare(password, user.password);

    if (!user) {
      throw new NotAcceptableException('Could not find the user');
    }

    if (user && passwordValid) {
      return user;
    }

    return null;
  }

  async login(user: any) {
    const { email } = user;

    return {
      user: await this.usersService.getUser({ email }),
      accessToken: this.jwtService.sign({ email }),
    };
  }
}
