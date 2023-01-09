import {
  CanActivate,
  ExecutionContext,
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

    const { refresh_token, phone } = request.body;
    if (!refresh_token) {
      throw new UnauthorizedException('Поле refresh_token обязательно');
    }
    if (!phone) {
      throw new UnauthorizedException(`Поле phone обязательно`);
    }

    const user = await this.authService.validateUser({ phone });

    if (!user) {
      throw new UnauthorizedException(
        'Пользователя c таким именем не существует',
      );
    }
    return true;
  }
}
