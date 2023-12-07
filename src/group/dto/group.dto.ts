import { IsArray, IsHexColor, IsNotEmpty, IsString } from 'class-validator';

export class groupDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsHexColor()
  color: string;

  @IsArray()
  @IsString({ each: true })
  kidId: string[];
}

export class editGroupDto extends groupDto {
  @IsArray()
  @IsString({ each: true })
  kidId: string[];
}
