import { Injectable } from '@nestjs/common';
import { User } from './entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto/create-user.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  findAll(queryParams: PaginationQueryDto) {
    const { limit, offset } = queryParams;
    return this.userRepository.find({
      take: limit,
      skip: offset,
    });
  }

  async create(createUserDto: CreateUserDto) {
    const coffee = this.userRepository.create(createUserDto);
    return this.userRepository.save(coffee);
  }
}
