import {
  ConflictException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const existingUser = await this.userModel.findOne({ email: createUserDto.email }).exec();
    
    if (existingUser) {
      throw new ConflictException(`User email ${createUserDto.email} already exists`);
    }

    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  async findById(id: string): Promise<UserDocument> {
    const user = await this.userModel.findById({ _id: id }).exec();

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async findOne(query: FilterQuery<UserDocument>): Promise<UserDocument> {
    const user = await this.userModel.findOne(query).exec();

    if (!user) {
      throw new NotFoundException(`User query ${JSON.stringify(query)} not found`);
    }

    return user;
  }

  async update(
    id: string,
    updateUserDto: Partial<UpdateUserDto>,
  ): Promise<UserDocument> {
    const patchUser = await this.userModel
      .findByIdAndUpdate({ _id: id }, updateUserDto, { new: true })
      .exec();

    if (!patchUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return patchUser;
  }

  async remove(id: string): Promise<UserDocument> {
    const deletedUser = await this.userModel
      .findByIdAndDelete({ _id: id })
      .exec();

    if (!deletedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return deletedUser;
  }
}
