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
import { SignUpGuard } from './guards/signUp.guard';
import { LoginUserDto } from './dto/login-user.dto';
import { SignInGuard } from './guards/signIn.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(SignUpGuard)
  async signUp(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.signUp(createUserDto);
  }

  @Post('signIn')
  @HttpCode(HttpStatus.OK)
  @UseGuards(SignInGuard)
  async signIn(@Body() loginUserDto: LoginUserDto) {
    const user = await this.userService.signIn(loginUserDto);

    const access = await this.authService.generateAccessToken(user);
    const refresh = await this.authService.generateRefreshToken(user.userId);

    return {
      ...access,
      ...refresh,
      user,
    };
  }

  @Post('signOut')
  @HttpCode(HttpStatus.CREATED)
  signOut() {}

  @Get('activate/:link')
  activate(@Param('link') link: string) {}

  @Get('refresh')
  refresh() {}
}
