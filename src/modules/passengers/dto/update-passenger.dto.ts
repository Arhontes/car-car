import { CreatePassengerDto } from './create-passenger.dto';

export class UpdatePassengerDto extends CreatePassengerDto {
  readonly approved: boolean;
  readonly reservedTime: string;
}
