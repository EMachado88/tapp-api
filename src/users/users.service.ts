import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(
    username: string,
    password: string,
    firstName: string,
    lastName: string,
  ): Promise<User | NotAcceptableException> {
    const user = await this.getUser({ username, isDeleted: false });

    if (user && !user.isDeleted) {
      return new NotAcceptableException('User already exists');
    }

    const newUser = new User();
    newUser.username = username;
    newUser.password = password;
    newUser.firstName = firstName;
    newUser.lastName = lastName;

    return await this.userRepository.save(newUser);
  }

  deleteUser(query: object): Promise<{ affected?: number }> {
    return this.userRepository.delete({ ...query });
  }

  async updateUser(query: any): Promise<User> {
    const user = await this.getUser({ username: query.username });

    if (query.password) user.password = await bcrypt.hash(query.password, 10);
    if (query.firstName) user.firstName = query.firstName;
    if (query.lastName) user.lastName = query.lastName;
    if (query.isAdmin) user.isAdmin = query.isAdmin;
    if (query.isVerified) user.isVerified = query.isVerified;
    if (query.isDeleted) user.isDeleted = query.isDeleted;
    user.updatedAt = new Date();

    return this.userRepository.save(user);
  }

  getUser(query: object): Promise<User> {
    return this.userRepository.findOneBy(query);
  }

  getUsers() {
    return this.userRepository.find();
  }
}
