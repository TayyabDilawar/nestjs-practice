import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Address, AddressSchema } from './address.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ required: true })
  name!: string;

  @Prop({ type: AddressSchema })
  address?: Address;
}

export const UserSchema = SchemaFactory.createForClass(User);
