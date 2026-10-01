import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Profile } from './profile.schema';

export type EmployeeDocument = HydratedDocument<Employee>;

@Schema()
export class Employee {
  @Prop()
  name!: string;

  @Prop({ type: Types.ObjectId, ref: Profile.name })
  profile!: Types.ObjectId | Profile;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
