import { Body, Controller, Post, NotAcceptableException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.model';
import * as bcrypt from 'bcrypt';

@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  async createUser(
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
  ): Promise<User | NotAcceptableException> {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);

    const result = await this.usersService.createUser(
      email,
      hashedPassword,
      firstName,
      lastName,
    );

    return result;
  }
}
