import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Address, AddressSchema } from 'src/common/schemas/address.schema';
import { User } from 'src/user/schemas/user.schema';

export type AssociationDocument = Association & Document;

@Schema({ collection: 'association', timestamps: true, versionKey: false })
export class Association {
  @Prop({ required: true })
  name: string;

  @Prop()
  phone: string;

  @Prop()
  website: string;

  @Prop({ type: AddressSchema })
  address: Address;

  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  // userId: User;
}

export const AssociationSchema = SchemaFactory.createForClass(Association);
