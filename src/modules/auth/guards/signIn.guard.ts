import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { UsersService } from '../../users/users.service';
import bcrypt from 'bcrypt';

@Injectable()
export class SignInGuard implements CanActivate {
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

    const { phone, password } = request.body;

    const user = await this.userService.findOne(phone);
    const hashPassword = await bcrypt.hash(password, 3);

    if (!user || user.password !== hashPassword) {
      throw new UnauthorizedException(`phone number or password is incorrect`);
    }
    return true;
  }
}
