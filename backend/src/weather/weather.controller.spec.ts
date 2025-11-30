import { Test, TestingModule } from '@nestjs/testing';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
import { CreateWeatherDto } from './dto/create-weather.dto';
import { Response } from 'express';

describe('WeatherController', () => {
  let controller: WeatherController;
  let service: WeatherService;

  const mockWeatherService = {
    create: jest.fn(),
    findAll: jest.fn(),
    getInsights: jest.fn(),
    exportToCsv: jest.fn(),
    exportToXlsx: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeatherController],
      providers: [
        {
          provide: WeatherService,
          useValue: mockWeatherService,
        },
      ],
    }).compile();

    controller = module.get<WeatherController>(WeatherController);
    service = module.get<WeatherService>(WeatherService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new weather entry with timestamp', async () => {
      const createWeatherDto: CreateWeatherDto = {
        temp: 25,
        humidity: 60,
        wind_speed: 10,
        precipitation_probability: 0,
        cloud_cover: 0,
        weather_code: 0,
        timestamp: 1678886400,
      };
      const expectedResult = { ...createWeatherDto, _id: 'someId' };
      mockWeatherService.create.mockResolvedValue(expectedResult);

      const result = await controller.create(createWeatherDto);
      expect(result).toEqual(expectedResult);
      expect(service.create).toHaveBeenCalledWith(createWeatherDto);
    });

    it('should create a new weather entry without timestamp', async () => {
      const createWeatherDto: CreateWeatherDto = {
        temp: 25,
        humidity: 60,
        wind_speed: 10,
        precipitation_probability: 0,
        cloud_cover: 0,
        weather_code: 0,
        timestamp: undefined,
      };
      const expectedResult = { ...createWeatherDto, _id: 'someId' };
      mockWeatherService.create.mockResolvedValue(expectedResult);

      const result = await controller.create(createWeatherDto);
      expect(result).toEqual(expectedResult);
      expect(service.create).toHaveBeenCalledWith(createWeatherDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of weather entries', async () => {
      const expectedResult = [
        {
          temp: 25,
          humidity: 60,
          wind_speed: 10,
          precipitation_probability: 0,
          cloud_cover: 0,
          weather_code: 0,
          timestamp: 1678886400,
          created_at: 1678886400,
          _id: 'someId',
        },
      ];
      mockWeatherService.findAll.mockResolvedValue(expectedResult);

      const result = await controller.findAll();
      expect(result).toEqual(expectedResult);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('getInsights', () => {
    it('should return weather insights', async () => {
      const expectedResult = { some: 'insights' };
      mockWeatherService.getInsights.mockResolvedValue(expectedResult);

      const result = await controller.getInsights();
      expect(result).toEqual(expectedResult);
      expect(service.getInsights).toHaveBeenCalled();
    });
  });

  describe('exportCsv', () => {
    it('should export weather data as CSV', async () => {
      const mockCsv = 'col1,col2\nval1,val2';
      mockWeatherService.exportToCsv.mockResolvedValue(mockCsv);

      const mockResponse = {
        header: jest.fn(),
        attachment: jest.fn(),
        send: jest.fn(),
      } as unknown as Response;

      await controller.exportCsv(mockResponse);

      expect(mockResponse.header).toHaveBeenCalledWith('Content-Type', 'text/csv');
      expect(mockResponse.attachment).toHaveBeenCalledWith('weather.csv');
      expect(mockResponse.send).toHaveBeenCalledWith(mockCsv);
    });
  });

  describe('exportXlsx', () => {
    it('should export weather data as XLSX', async () => {
      const mockBuffer = Buffer.from('xlsx-data');
      mockWeatherService.exportToXlsx.mockResolvedValue(mockBuffer);

      const mockResponse = {
        header: jest.fn(),
        attachment: jest.fn(),
        send: jest.fn(),
      } as unknown as Response;

      await controller.exportXlsx(mockResponse);

      expect(mockResponse.header).toHaveBeenCalledWith(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      );
      expect(mockResponse.attachment).toHaveBeenCalledWith('weather.xlsx');
      expect(mockResponse.send).toHaveBeenCalledWith(mockBuffer);
    });
  });
});