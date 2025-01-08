
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto/create-user.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly coffesService: UsersService) {}
  @Get(':role')
  findAll(
    @Query() queryParams: PaginationQueryDto,
    @Param('role') role: string,
  ) {
    return this.coffesService.findAll(queryParams, role);
  }
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.coffesService.create(createUserDto);
  }
}
    