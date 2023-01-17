import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type CarDocument = Car & Document;

@Schema()
export class Car {
  @Prop({ type: String, default: uuidv4(), required: true })
  carId;

  @Prop({ type: String, required: true })
  licensePlate;

  @Prop({ type: String, required: true })
  color;

  @Prop({ type: String, required: true })
  userId;
}

export const CarSchema = SchemaFactory.createForClass(Car);
