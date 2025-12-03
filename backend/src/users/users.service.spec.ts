import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';

const mockUserModel = {
  new: jest.fn().mockResolvedValue({}),
  constructor: jest.fn().mockResolvedValue({}),
  find: jest.fn(),
  create: jest.fn(),
  exec: jest.fn(),
};

describe('UsersService', () => {
  let service: UsersService;
  let model: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    model = module.get<Model<User>>(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const createUserDto = {
        name: 'Test User',
        email: 'test@example.com',
        role: 'user',
        password: 'password',
      };
      const savedUser = { ...createUserDto, save: jest.fn().mockResolvedValue(createUserDto) };
      
      mockUserModel.new.mockReturnValue(savedUser);
      
      const result = await service.create(createUserDto);
      
      expect(mockUserModel.new).toHaveBeenCalledWith(createUserDto);
      expect(savedUser.save).toHaveBeenCalled();
      expect(result).toEqual(createUserDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = [{ name: 'Test User' }];
      mockUserModel.find.mockReturnValue({
        exec: jest.fn().mockResolvedValue(users),
      });
      const result = await service.findAll();
      expect(result).toEqual(users);
    });
  });

  describe('exportToCsv', () => {
    it('should export user data to CSV', async () => {
      const users = [
        {
          role: 'admin',
          name: 'Admin User',
          email: 'admin@example.com',
          created_at: Date.now(),
          updated_at: Date.now(),
        },
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(users as any);

      const csv = await service.exportToCsv();

      expect(csv).toContain('role,name,email,created_at,updated_at');
      expect(csv).toContain(
        `${users[0].role},${users[0].name},${users[0].email}`,
      );
    });
  });

  describe('exportToXlsx', () => {
    it('should export user data to XLSX', async () => {
      const users = [
        {
          role: 'admin',
          name: 'Admin User',
          email: 'admin@example.com',
          created_at: Date.now(),
          updated_at: Date.now(),
        },
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(users as any);

      const buffer = await service.exportToXlsx();

      expect(buffer).toBeInstanceOf(Buffer);
    });
  });

  describe('getInsights', () => {
    it('should return a message if no data is available', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue([]);
      const insights = await service.getInsights();
      expect(insights).toEqual({
        message: 'No user data available to generate insights.',
      });
    });

    it('should return insights if data is available', async () => {
      const users = [
        {
          role: 'admin',
          name: 'Admin User',
          email: 'admin@example.com',
          created_at: Date.now(),
          updated_at: Date.now(),
        },
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(users as any);
      const insights = await service.getInsights();
      expect(insights).toBeUndefined(); // TODO: Implement insights logic and update test
    });
  });
});
