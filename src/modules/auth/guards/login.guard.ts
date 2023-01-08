import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { UsersService } from '../../users/users.service';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  async canActivate(
    context: ExecutionContext,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const { email, password } = request.body;

    const match = await this.authService.validatePassword(email, password);

    if (!match) {
      throw new UnauthorizedException(`phone number or password is incorrect`);
    }
    return true;
  }
}
