import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async createUser(
    username: string,
    password: string,
    firstName: string,
    lastName: string,
  ): Promise<User | NotAcceptableException> {
    const user = await this.getUser({ username });

    if (user) {
      return new NotAcceptableException('User already exists');
    }

    return this.userModel.create({
      username,
      password,
      firstName,
      lastName,
    });
  }

  async getUser(query: object): Promise<User> {
    const user = this.userModel.findOne({ ...query, isDeleted: false });

    return user;
  }
}
