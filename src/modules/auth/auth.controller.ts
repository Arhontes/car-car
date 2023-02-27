import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { RegisterGuard } from './guards/register.guard';
import { LoginUserDto } from './dto/login-user.dto';
import { LoginGuard } from './guards/login.guard';
import { AuthService } from './auth.service';
import { RefreshJWTGuard } from './guards/refresh-jwt.guard';
import { UserResponseType } from '../../common/types/users-types';

@Controller('auth')
@UsePipes(new ValidationPipe({ transform: true }))
export class AuthController {
  constructor(
    private readonly userService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('reg')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(RegisterGuard)
  async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponseType> {
    const user = await this.userService.register(createUserDto);

    return this.userService.prepareUserAsResponse(user);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LoginGuard)
  async login(
    @Res({ passthrough: true }) res,
    @Body() loginUserDto: LoginUserDto,
  ) {
    const user = await this.userService.login(loginUserDto);

    const access = await this.authService.generateAccessToken(user);
    const refresh = await this.authService.generateRefreshToken(user.userId);

    const date = new Date();
    date.setTime(date.getTime() + 30 * 24 * 60 * 60 * 1000);

    // res.cookie('token', refresh.refresh_token, {
    //   httpOnly: true,
    //   expires: date,
    // });

    const userAsResponse = this.userService.prepareUserAsResponse(user);

    return {
      ...access,
      ...refresh,
      user: { ...userAsResponse },
    };
  }

  /* @Get('me')
  @HttpCode(HttpStatus.FOUND)
  @UseGuards(JwtGuard)
  async authMe(@Req() req): Promise<UserResponseType> {
    const token = req.token;

    const user = await this.authService.getUserByTokenData(token);

    return this.userService.prepareUserAsResponse(user);
  }*/

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Res({ passthrough: true }) res) {
    res.cookie('token', '', {
      httpOnly: true,
      expires: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
    });
  }

  @Get('activate/:link')
  activate(@Param('link') link: string) {}

  @UseGuards(RefreshJWTGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshToken(@Req() req, @Res({ passthrough: true }) res) {
    const user = await this.userService.findOne({ userId: req.userId });

    const userAsResponse = this.userService.prepareUserAsResponse(user);

    const access = await this.authService.generateAccessToken(user);

    const refresh = await this.authService.generateRefreshToken(user.userId);

    // if (!req.isFreshToken) {
    //   const date = new Date();
    //   date.setTime(date.getTime() + 30 * 24 * 60 * 60 * 1000);
    //
    //   res.cookie('token', refresh.refresh_token, {
    //     httpOnly: true,
    //     expires: date,
    //   });
    // }

    return {
      ...access,
      ...refresh,
      user: userAsResponse,
    };
  }
}
