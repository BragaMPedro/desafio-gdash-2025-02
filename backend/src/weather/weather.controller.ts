import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import type { Response } from 'express';
import { Public } from 'src/auth/decorators/public.decorators';
import { CreateWeatherDto } from './dto/create-weather.dto';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Public()
  @Post()
  create(@Body() createWeatherDto: CreateWeatherDto) {
    return this.weatherService.create(createWeatherDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.weatherService.findAll();
  }

  @Get('insights')
  getInsights() {
    return this.weatherService.getInsights();
  }

  @Get('export/csv')
  async exportCsv(@Res() res: Response) {
    const csv = await this.weatherService.exportToCsv();
    res.header('Content-Type', 'text/csv');
    res.attachment('weather.csv');
    res.send(csv);
  }

  @Get('export/xlsx')
  async exportXlsx(@Res() res: Response) {
    const buffer = await this.weatherService.exportToXlsx();
    res.header(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.attachment('weather.xlsx');
    res.send(buffer);
  }
}

