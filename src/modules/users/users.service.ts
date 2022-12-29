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

  async signUp(createUserDto: CreateUserDto): Promise<User | null> {
    const existingUser = await this.userModel.findOne({
      phone: createUserDto.phone,
    });

    if (existingUser) {
      return null;
    }
    const passwordHash = await bcrypt.hash(createUserDto.password, 3);

    const user: CreateUserDto = { ...createUserDto, password: passwordHash };

    const createdUser = new this.userModel(user);

    return createdUser.save();
  }

  async signIn(loginUserDto: LoginUserDto): Promise<User | null> {
    const user = await this.userModel.findOne({
      phone: loginUserDto.phone,
    });

    if (!user) {
      return null;
    }

    return user;
  }

  async findOne(phone: string): Promise<User> {
    return this.userModel.findOne({ phone });
  }
}
