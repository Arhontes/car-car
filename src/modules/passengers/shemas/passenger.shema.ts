import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type PassengerDocument = Passenger & Document;

@Schema()
export class Passenger {
  @Prop({ type: String, required: true })
  phone;

  @Prop({ type: String, unique: true, required: true, default: () => uuidv4() })
  passengerId;

  @Prop({ type: String, required: true })
  tripId;

  @Prop({ type: String, required: true, default: () => uuidv4() })
  userId;

  @Prop({ type: String, required: true })
  email;

  @Prop({ type: String, required: true })
  from;

  @Prop({ type: String, required: true })
  to;

  @Prop({ type: String, required: true })
  firstName;

  @Prop({ type: String, required: true })
  lastName;

  @Prop({ type: Boolean, default: false })
  approved;

  @Prop({ type: String, default: '15', required: false })
  reservedTime;
}

export const PassengerSchema = SchemaFactory.createForClass(Passenger);
