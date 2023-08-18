import { Injectable } from '@nestjs/common';
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

    const passwordValid = await bcrypt.compare(password, user.password);

    if (user && passwordValid) {
      user.password = undefined;
      return user;
    }

    return null;
  }

  async login(user: any) {
    const { username } = user;

    const savedUser = await this.usersService.getUser({ username });
    savedUser.password = undefined;

    return {
      user: savedUser,
      accessToken: this.jwtService.sign({ username }),
    };
  }
}
