import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { SchemaTypes } from 'mongoose';
import { Association } from 'src/association/schemas/association.schema';

export type RoleDocument = Role & Document;

export enum UserRoles {
  ADMIN,
  USER,
}

@Schema({ _id: false, versionKey: false })
export class Role {
  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Association' }])
  assoId: Association;

  @Prop({ required: true })
  role: UserRoles;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
