import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Book } from './book.schema';

@Schema({ timestamps: true })
export class Library extends Document {
  @Prop()
  name!: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: Book.name }] })
  books!: Types.ObjectId[];
}

export const LibrarySchema = SchemaFactory.createForClass(Library);
