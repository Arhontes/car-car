import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  readonly password: string;

  @IsNotEmpty()
  readonly phone: string;

  // @IsNotEmpty()
  // readonly userId: string;

  @IsEmail()
  readonly email: string;
}
