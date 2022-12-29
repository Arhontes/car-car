import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  readonly password: string;

  @IsNotEmpty()
  readonly phone: string;
}
