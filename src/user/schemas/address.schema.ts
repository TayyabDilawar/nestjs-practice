import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  _id: false,
})
export class Address {
  @Prop({ required: true })
  street!: string;

  @Prop({ required: true })
  city!: string;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
