import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { Address } from 'src/common/schemas/address.schema';
import { Type } from 'class-transformer';

export class AssociationDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @Type(() => Address)
  @ValidateNested()
  address: Address;

  @IsOptional()
  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  website: string;
}
export class CreateAssociationDto {
  @IsString()
  name: string;

  @Type(() => Address)
  @ValidateNested()
  address: Address;

  @IsOptional()
  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  website: string;
}

export class UpdateAssociationDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @Type(() => Address)
  @ValidateNested()
  address: Address;

  @IsOptional()
  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  website: string;

  // @IsString()
  // userId: string;
}
