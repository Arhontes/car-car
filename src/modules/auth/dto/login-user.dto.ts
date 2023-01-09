import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty({ message: 'Required' })
  readonly password: string;

  @IsNotEmpty({ message: 'Required' })
  @IsEmail()
  readonly email: string;
}
