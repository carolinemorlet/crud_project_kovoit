import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type AddressDocument = Address & Document;

@Schema({ _id: false, versionKey: false })
export class Address {
  @Prop({ required: true })
  street1: string;

  @Prop({ default: null })
  street2: string;

  @Prop({ required: true })
  zip: string;

  @Prop({ required: true })
  city: string;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
