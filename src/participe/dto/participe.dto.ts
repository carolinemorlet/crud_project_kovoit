import { IsOptional, IsString, ValidateIf } from 'class-validator';

export class CreateParticipeDto {
  @IsString()
  eventId: string;

  @IsOptional()
  @IsString()
  carshareId: string;

  @IsString()
  kidId: string;
}

export class updateParticipeDto {
  @IsString()
  @ValidateIf((_object, value) => value !== null)
  carshareId: string | null;
}
