import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/shemas/user.shema';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constans';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async generateAccessToken(user: User) {
    return {
      access_token: this.jwtService.sign({ user }),
    };
  }

  async generateRefreshToken(userId: string) {
    return {
      refresh_token: this.jwtService.sign(
        { userId },
        { secret: jwtConstants.secret, expiresIn: '30d' },
      ),
    };
  }

  verifyToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      return { error: error.message };
    }
  }

  async validateUser(phone: string): Promise<User | null> {
    const user = await this.usersService.findOne(phone);
    if (!user) {
      return null;
    }
    return user;
  }

  async validatePassword(
    phone: string,
    password: string,
  ): Promise<boolean | null> {
    const user = await this.usersService.findOne(phone);
    if (!user) {
      return null;
    }
    return await bcrypt.compare(password, user.password);
  }

  parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join(''),
    );

    return JSON.parse(jsonPayload);
  }

  async getUserByTokenData(token: string): Promise<any> {
    const parsedTokenData = this.parseJwt(token);
    return await this.usersService.findOne(parsedTokenData.user.phone);
  }
}
