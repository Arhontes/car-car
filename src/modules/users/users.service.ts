import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './shemas/user.shema';
import { Model } from 'mongoose';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { LoginUserDto } from '../auth/dto/login-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async register(createUserDto: CreateUserDto): Promise<User | null> {
    const existingUser = await this.findOne(createUserDto.phone);

    if (existingUser) {
      return null;
    }
    const passwordHash = await bcrypt.hash(createUserDto.password, 3);

    const newUser: CreateUserDto = { ...createUserDto, password: passwordHash };

    const createdUser = new this.userModel(newUser);

    await createdUser.save();

    createdUser.password = undefined;

    return createdUser;
  }

  async login(loginUserDto: LoginUserDto): Promise<User | null> {
    const user = await this.userModel.findOne({
      email: loginUserDto.email,
    });

    if (!user) {
      return null;
    }

    user.password = undefined;
    return user;
  }

  async findOne(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }
}
