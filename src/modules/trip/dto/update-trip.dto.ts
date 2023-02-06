import { Car } from '../../car/shemas/car.shema';

export class UpdateTripDto {
  readonly direction: string;
  readonly date: number;
  readonly startTime: string;
  readonly car: Car;
  readonly userId: string;
}
