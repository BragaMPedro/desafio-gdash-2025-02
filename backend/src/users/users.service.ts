import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.userModel.create(createUserDto);
  }

  async findAll(filter: any = {}): Promise<User[]> {
    return this.userModel.find(filter).exec();
  }

  async findOne(id: number): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async update(id: number, updateUserDto: Partial<CreateUserDto>): Promise<User | null> {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
  }

  async remove(id: number): Promise<User | null> {
    return this.userModel.findByIdAndDelete(id).exec();
  } 
}
