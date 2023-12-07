import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from './role.schema';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

// export enum enumUserStatus {
//   CREATE,
//   PENDING,
//   VALIDATE,
//   ACTIVE,
//   NON_ACTIVE_MAIL,
// }

@Schema({ collection: 'user', timestamps: true, versionKey: false })
export class User {
  @Prop({ required: true })
  firstname: string;

  @Prop({ required: true })
  lastname: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  associationName: string;

  // @Prop({ type: Number, enum: enumUserStatus })
  // status: enumUserStatus;

  @Prop([{ type: Role, default: [] }])
  roles: Role[];

  // @Prop()
  // all_event_available: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
