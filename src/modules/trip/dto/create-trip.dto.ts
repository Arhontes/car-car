import { Car } from '../../car/shemas/car.shema';

export class CreateTripDto {
  readonly direction: string;
  readonly date: number;
  readonly car: Car;
  /*readonly passengers: Array<Passenger> | null;*/
  readonly tripId: string;
  readonly managerId: string;
}
