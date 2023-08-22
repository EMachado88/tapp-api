import {
  Body,
  Controller,
  Post,
  NotAcceptableException,
  Delete,
  UseGuards,
  Get,
  Param,
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

    const user = await this.usersService.getUser({ username });

    if (user.isDeleted) {
      return this.usersService.updateUser({
        username,
        firstName,
        lastName,
        password: hashedPassword,
        isDeleted: false,
        updatedAt: new Date(),
      });
    } else if (user) {
      return new NotAcceptableException('User already exists');
    }

    const result = await this.usersService.createUser(
      username,
      hashedPassword,
      firstName,
      lastName,
    );

    return result;
  }

  @Delete('/delete/:id')
  @UseGuards(AuthGuard('jwt'))
  async deleteUser(@Param('id') id: string): Promise<any> {
    const result = await this.usersService.deleteUser({ _id: id });

    return result;
  }

  @Get('/users')
  async getUsers(): Promise<User[]> {
    const users = await this.usersService.getUsers();

    return users;
  }
}
