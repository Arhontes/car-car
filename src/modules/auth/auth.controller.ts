import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../users/shemas/user.shema';
import { RegisterGuard } from './guards/register.guard';
import { LoginUserDto } from './dto/login-user.dto';
import { LoginGuard } from './guards/login.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('reg')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(RegisterGuard)
  async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.register(createUserDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LoginGuard)
  async login(@Body() loginUserDto: LoginUserDto) {
    const user = await this.userService.login(loginUserDto);

    const access = await this.authService.generateAccessToken(user);
    const refresh = await this.authService.generateRefreshToken(user.userId);

    user.password = undefined;

    return {
      ...access,
      ...refresh,
      user,
    };
  }

  @Post('logout')
  @HttpCode(HttpStatus.CREATED)
  logout() {}

  @Get('activate/:link')
  activate(@Param('link') link: string) {}

  @Get('refresh')
  refresh() {}
}
