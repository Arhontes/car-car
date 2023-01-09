import {
  IsEmail,
  IsNotEmpty,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Required' })
  @MaxLength(20, {
    message: ({ property, constraints }) => {
      return `${property} must be less than ${constraints} symbols`;
    },
  })
  readonly firstName: string;

  @IsNotEmpty({ message: 'Required' })
  @MaxLength(20, {
    message: ({ property, constraints }) => {
      return `${property} must be less than ${constraints} symbols`;
    },
  })
  readonly lastName: string;

  @MaxLength(20, {
    message: ({ property, constraints }) => {
      return `${property} must be less than ${constraints} symbols`;
    },
  })
  @MinLength(6, {
    message: ({ property, constraints }) => {
      return `${property} must be equal or more than ${constraints} symbols`;
    },
  })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,}/, {
    message:
      'Password must contain numbers,lowercase and uppercase letters of the Latin alphabet',
  })
  readonly password: string;

  @Matches(/^\+?[78][-\(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/, {
    message: `Phone is incorrect`,
  })
  @Transform(({ value }) => {
    const phoneTf = value.replace(/[^0-9]/g, '');
    if (phoneTf[0] === '7') {
      return '8' + phoneTf.substring(1);
    }
    return phoneTf;
  })
  readonly phone: string;

  @MaxLength(20, {
    message: ({ property, constraints }) => {
      return `${property} must be less than ${constraints} symbols`;
    },
  })
  @IsEmail({}, { message: 'Email is incorrect' })
  readonly email: string;
}
