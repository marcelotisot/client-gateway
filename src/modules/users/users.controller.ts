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

import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CreateUserDto, UpdateUserDto } from './dto';
import { PaginationDto } from '../../common';
import { NATS_SERVICE } from '../../config';
import { catchError } from 'rxjs';

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
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    
    return this.natsClient.send('find-one-user', id)
      .pipe(
        catchError(err => {
          throw new RpcException(err)
        })
      );

  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updateUserDto: UpdateUserDto
  ) {

    return this.natsClient.send('update-user', {
      id, 
      ...updateUserDto 
    }).pipe(
      catchError(err => {
        throw new RpcException(err)
      })
    );
    
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {

    return this.natsClient.send('remove-user', id)
      .pipe(
        catchError(err => {
          throw new RpcException(err)
        })
      );

  }

}
