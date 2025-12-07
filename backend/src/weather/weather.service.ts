import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { format } from 'fast-csv';
import { Model } from 'mongoose';
import * as xlsx from 'xlsx';
import { CreateWeatherDto } from './dto/create-weather.dto';
import { Weather, WeatherDocument } from './schemas/weather.schema';

@Injectable()
export class WeatherService {
  constructor(
    @InjectModel(Weather.name) private weatherModel: Model<WeatherDocument>,
  ) {}

  async create(createWeatherDto: CreateWeatherDto): Promise<Weather> {
    const createdWeather = new this.weatherModel(createWeatherDto);
    return createdWeather.save();
  }

  async findAll(filter: any = {}): Promise<Weather[]> {
    return this.weatherModel.find(filter).exec();
  }

  async exportToCsv(): Promise<string> {
    const weatherData = await this.findAll();
    const csvStream = format({ headers: true });

    return new Promise((resolve, reject) => {
      const chunks: any[] = [];
      csvStream.on('data', (chunk) => chunks.push(chunk));
      csvStream.on('end', () => resolve(Buffer.concat(chunks).toString()));
      csvStream.on('error', (err) => reject(err));

      weatherData.forEach((weather) => {
        csvStream.write({
          temperature: weather.temperature,
          humidity: weather.humidity,
          wind_speed: weather.wind_speed,
          precipitation_probability: weather.precipitation_probability,
          cloud_cover: weather.cloud_cover,
          weather_code: weather.weather_code,
          timestamp: weather.timestamp,
          created_at: weather.created_at,
        });
      });

      csvStream.end();
    });
  }

  async exportToXlsx(): Promise<Buffer> {
    const weatherData = await this.findAll();
    const data = weatherData.map((weather) => ({
      temperature: weather.temperature,
      humidity: weather.humidity,
      wind_speed: weather.wind_speed,
      precipitation_probability: weather.precipitation_probability,
      cloud_cover: weather.cloud_cover,
      weather_code: weather.weather_code,
      timestamp: weather.timestamp,
      created_at: weather.created_at,
    }));
    const ws = xlsx.utils.json_to_sheet(data);
    const wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Weather');
    return xlsx.write(wb, { type: 'buffer', bookType: 'xlsx' });
  }

  async getInsights(): Promise<any> {
    const weatherData = await this.findAll();
    if (weatherData.length === 0) {
      return { message: 'No weather data available to generate insights.' };
    }

    //TO-DO: AI Analisis of Weather data
    
  }
}

