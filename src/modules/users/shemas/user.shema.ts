import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ unique: true, type: String, required: true })
  phone;

  @Prop({ unique: true, type: String, required: true, default: uuidv4() })
  userId;

  @Prop({ unique: true, type: String, required: true })
  email;

  @Prop({ type: String, required: true })
  password;

  @Prop({ type: Boolean, default: false })
  isActivated;

  @Prop({ type: String })
  activationLink;

  @Prop({ type: String, required: true })
  firstName;

  @Prop({ type: String, required: true })
  lastName;

  @Prop({ type: Boolean, default: false })
  blocked;

  @Prop({ type: Date, required: true, default: Date.now() })
  createDate;
}

export const UserSchema = SchemaFactory.createForClass(User);
