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

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.getUser({
      username,
      isDeleted: false,
    });

    const passwordValid = await bcrypt.compare(password, user.password);

    if (user && passwordValid) {
      user.password = undefined;
      return user;
    }

    return null;
  }

  async login(user: any) {
    const { username } = user;

    const savedUser = await this.usersService.getUser({
      username,
      isDeleted: false,
    });

    if (!savedUser) {
      return { message: 'User not found' };
    }

    savedUser.password = undefined;

    return {
      user: savedUser,
      accessToken: this.jwtService.sign({ username }),
    };
  }
}
