import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  Inject, 
  Query, 
  ParseUUIDPipe 
} from '@nestjs/common';

import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto, UpdateUserDto } from './dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { NATS_SERVICE } from '../../config';

@Controller('users')
export class UsersController {

  constructor(
    @Inject(NATS_SERVICE) private readonly natsClient: ClientProxy
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.natsClient.send('create-user', createUserDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.natsClient.send('find-all-users', paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.natsClient.send('find-one-user', id);
  }


  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updateUserDto: UpdateUserDto
  ) {

    return this.natsClient.send('update-user', {
      id,
      ...updateUserDto
    });
    
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.natsClient.send('remove-user', id);
  }

}
