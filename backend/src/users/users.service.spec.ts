import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { UsersService } from './users.service';

const mockUser = {
  _id: '60d5f1b3e6b3f1b3e6b3f1b3',
  name: 'Test User',
  email: 'test@example.com',
  role: 'user',
} as unknown as UserDocument;

const mockUserModel = {
  create: jest.fn(),
  find: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
};

describe('UsersService', () => {
  let service: UsersService;
  let model: Model<UserDocument>;

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
    model = module.get<Model<UserDocument>>(getModelToken(User.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and return a user', async () => {
      const createUserDto: CreateUserDto = {
        name: 'Test User',
        email: 'test@example.com',
        role: 'user',
        password: 'password',
      };

      (model.create as jest.Mock).mockResolvedValue(mockUser);

      const result = await service.create(createUserDto);

      expect(model.create).toHaveBeenCalledWith(createUserDto);
      expect(result).toEqual(mockUser);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = [mockUser];
      mockUserModel.find.mockReturnValue({
        exec: jest.fn().mockResolvedValue(users),
      } as any);

      const result = await service.findAll();

      expect(model.find).toHaveBeenCalledWith({});
      expect(result).toEqual(users);
    });

    it('should return an empty array if no users are found', async () => {
      mockUserModel.find.mockReturnValue({
        exec: jest.fn().mockResolvedValue([]),
      } as any);

      const result = await service.findAll();

      expect(model.find).toHaveBeenCalledWith({});
      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should find and return a user by ID', async () => {
      mockUserModel.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockUser),
      } as any);

      const result = await service.findOne(1);

      expect(model.findById).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockUser);
    });

    it('should return null if user is not found', async () => {
      mockUserModel.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      } as any);

      const result = await service.findOne(1);

      expect(model.findById).toHaveBeenCalledWith(1);
      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('should find and update a user by ID', async () => {
      const updateUserDto = { name: 'Updated User' };
      const updatedUser = { ...mockUser, ...updateUserDto };

      mockUserModel.findByIdAndUpdate.mockReturnValue({
        exec: jest.fn().mockResolvedValue(updatedUser),
      } as any);

      const result = await service.update(1, updateUserDto);

      expect(model.findByIdAndUpdate).toHaveBeenCalledWith(1, updateUserDto, {
        new: true,
      });
      expect(result).toEqual(updatedUser);
    });

    it('should return null if user to update is not found', async () => {
      const updateUserDto = { name: 'Updated User' };
      mockUserModel.findByIdAndUpdate.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      } as any);

      const result = await service.update(1, updateUserDto);

      expect(model.findByIdAndUpdate).toHaveBeenCalledWith(1, updateUserDto, {
        new: true,
      });
      expect(result).toBeNull();
    });
  });

  describe('remove', () => {
    it('should find and remove a user by ID', async () => {
      mockUserModel.findByIdAndDelete.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockUser),
      } as any);

      const result = await service.remove(1);

      expect(model.findByIdAndDelete).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockUser);
    });

    it('should return null if user to remove is not found', async () => {
      mockUserModel.findByIdAndDelete.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      } as any);

      const result = await service.remove(1);

      expect(model.findByIdAndDelete).toHaveBeenCalledWith(1);
      expect(result).toBeNull();
    });
  });
});
