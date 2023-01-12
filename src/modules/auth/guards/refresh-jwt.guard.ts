import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable()
export class RefreshJWTGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(
    context: ExecutionContext,

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = request.cookies['token'];
    if (!token) {
      throw new UnauthorizedException('Поле refresh_token обязательно');
    }

    const validToken = await this.authService.verifyToken(token);

    if (!validToken.error || validToken?.error === 'jwt expired') {
      const parseData = this.authService.parseJwt(token);

      const user = this.authService.validateUser({ userId: parseData.userId });
      if (!user) {
        throw new UnauthorizedException(
          'Пользователя c таким именем не существует',
        );
      }
      request.userId = parseData.userId;
    }

    if (validToken?.error) {
      if (validToken.error === 'jwt expired') {
        return (request.isFreshToken = false);
      } else {
        throw new HttpException(validToken.error, HttpStatus.BAD_REQUEST);
      }
    } else {
      return (request.isFreshToken = true);
    }
  }
}
