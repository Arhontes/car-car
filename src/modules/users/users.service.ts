import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './shemas/user.shema';
import { Model } from 'mongoose';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { LoginUserDto } from '../auth/dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { ValidationUserType } from '../../common/types/validation-types';
import { UserResponseType } from '../../common/types/users-types';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async register(createUserDto: CreateUserDto): Promise<User | null> {
    const { phone, email } = createUserDto;

    const existingUser = await this.findOne({ phone, email });

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

    return user;
  }

  async findOne(data: ValidationUserType): Promise<User> {
    return this.userModel.findOne({ ...data }).exec();
  }

  prepareUserAsResponse({
    email,
    userId,
    phone,
    firstName,
    lastName,
  }: User): UserResponseType {
    return {
      email,
      userId,
      phone,
      firstName,
      lastName,
    };
  }
}
