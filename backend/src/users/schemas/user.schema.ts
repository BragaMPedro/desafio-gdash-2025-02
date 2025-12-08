import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({ default: Date.now })
  created_at: number;

  @Prop({ default: Date.now })
  updated_at: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
