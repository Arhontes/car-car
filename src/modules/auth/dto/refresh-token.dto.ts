import { IsNotEmpty } from 'class-validator';

export class RefreshTokenDto {
  @IsNotEmpty()
  readonly phone: string;

  @IsNotEmpty()
  readonly refresh_token: string;
}
