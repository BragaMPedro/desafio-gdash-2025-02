import { IsNumber } from 'class-validator';

export class CreateWeatherDto {
  @IsNumber()
  readonly temperature: number;

  @IsNumber()
  readonly humidity: number;

  @IsNumber()
  readonly precipitation_probability: number;

  @IsNumber()
  readonly cloud_cover: number;

  @IsNumber()
  readonly wind_speed: number;

  @IsNumber()
  readonly weather_code: number;

  @IsNumber()
  readonly timestamp: number;

  @IsNumber()
  readonly longitude: number;

  @IsNumber()
  readonly latitude: number;
}
