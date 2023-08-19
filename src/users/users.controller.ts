import {
  Body,
  Controller,
  Post,
  NotAcceptableException,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.model';
import * as bcrypt from 'bcrypt';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  async createUser(
    @Body('username') username: string,
    @Body('password') password: string,
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
  ): Promise<User | NotAcceptableException> {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);

    const result = await this.usersService.createUser(
      username,
      hashedPassword,
      firstName,
      lastName,
    );

    return result;
  }

  @Delete('/delete')
  @UseGuards(AuthGuard('jwt'))
  async deleteUser(@Body('username') username: string): Promise<any> {
    const result = await this.usersService.deleteUser({
      username,
      isDeleted: false,
    });

    return result;
  }
}
