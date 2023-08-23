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
    const user = await this.getUser({ username, isDeleted: false });

    if (user) {
      return new NotAcceptableException('User already exists');
    }

    return await this.userModel.create({
      username,
      password,
      firstName,
      lastName,
    });
  }

  getUser(query: object): Promise<User> {
    const user = this.userModel.findOne(query);

    return user;
  }

  deleteUser(query: object): Promise<User> {
    const user = this.userModel.findOneAndUpdate(
      { ...query },
      { isDeleted: true },
    );

    return user;
  }

  updateUser(query: any): Promise<User> {
    const user = this.userModel.findOneAndUpdate(
      { username: query.username },
      { ...query },
      { new: true },
    );

    return user;
  }

  getUsers() {
    return this.userModel.find({});
  }
}
