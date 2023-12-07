import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { EDate } from '../schemas/eDate.schema';
import { Address } from 'src/common/schemas/address.schema';
import { Type } from 'class-transformer';
import { Group } from 'src/group/schemas/group.schema';

export class CreateEventDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @Type(() => EDate)
  @ValidateNested()
  eDate: Date;

  @Type(() => Address)
  @ValidateNested()
  eventAddress: Address;

  @Type(() => Address)
  @ValidateNested()
  departureAddress: Address;

  // @IsString()
  // associationId: string;

  @IsArray()
  @IsString({ each: true })
  groupId: Group[];
}

export class UpdateEventDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @Type(() => EDate)
  @ValidateNested()
  eDate: EDate;

  @IsOptional()
  @Type(() => Address)
  @ValidateNested()
  eventAddress: Address;

  @IsOptional()
  @Type(() => Address)
  @ValidateNested()
  departureAddress: Address;

  // @IsString()
  // associationId: string;

  @IsArray()
  @IsString({ each: true })
  groupId: string[];
}
