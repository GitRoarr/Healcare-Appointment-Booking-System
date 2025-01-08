import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto/create-user.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';

@Controller('coffees')
export class UsersController {
  constructor(private readonly coffesService: UsersService) {}
  @Get()
  findAll(@Query() queryParams: PaginationQueryDto) {
    return this.coffesService.findAll(queryParams);
  }
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.coffesService.create(createUserDto);
  }
}
