import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { SchemaTypes } from "mongoose";
import { Association } from "src/association/schemas/association.schema";
import { Kid } from "src/kid/schemas/kid.schema";
import { User } from "src/user/schemas/user.schema";

export type RelationDocument = Relation & Document;

export enum enumRelationType {
    type1,
    type2,
    type3,
    type4
}

@Schema({collection:"relation", timestamps:true, versionKey:false})
export class Relation{
    @Prop([ { type: mongoose.Schema.Types.ObjectId, ref: 'Association'} ])
    assoId:Association

    @Prop([ { type: mongoose.Schema.Types.ObjectId, ref: 'Kid'} ])
    kidId:Kid

    @Prop([ { type: mongoose.Schema.Types.ObjectId, ref: 'User'} ])
    userId:User

    @Prop({type: Number, enum:enumRelationType})
    type:enumRelationType
}

export const RelationSchema = SchemaFactory.createForClass(Relation)