import { IsNumber, IsOptional } from 'class-validator';

export class CreateWeatherDto {
  @IsNumber()
  readonly temp: number;

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

  @IsOptional()
  @IsNumber()
  readonly timestamp: number;
}
