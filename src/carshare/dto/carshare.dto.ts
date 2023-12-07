import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CarshareDto {
  @IsNumber()
  available_seat: number;

  @IsBoolean()
  public: boolean;

  @IsString()
  eventId: string;

  @IsString()
  userId: string;
}
