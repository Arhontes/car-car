import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Car } from '../../car/shemas/car.shema';
import { PassengerSchema } from '../../passengers/shemas/passenger.shema';

export type TripDocument = Trip & Document;

@Schema()
export class Trip {
  @Prop({ type: String, required: true })
  direction;

  @Prop({ type: Number, required: true })
  date;

  @Prop({ type: String, default: '10:00', required: true })
  startTime;

  @Prop({ type: Car, required: false })
  car;

  @Prop({ type: [PassengerSchema], default: [], required: true })
  passengers;

  @Prop({ type: String, default: () => uuidv4(), required: true, unique: true })
  tripId;

  @Prop({ type: String, required: true })
  userId;
}

export const TripSchema = SchemaFactory.createForClass(Trip);
