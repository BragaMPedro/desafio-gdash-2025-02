import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WeatherDocument = Weather & Document;

@Schema()
export class Weather {
  @Prop()
  temp: number;

  @Prop()
  humidity: number;

  @Prop()
  precipitation_probability: number;

  @Prop()
  cloud_cover: number;

  @Prop()
  wind_speed: number;

  @Prop()
  weather_code: number;

  @Prop()
  timestamp: number;

  @Prop({ default: Date.now })
  created_at: number;
}

export const WeatherSchema = SchemaFactory.createForClass(Weather);
