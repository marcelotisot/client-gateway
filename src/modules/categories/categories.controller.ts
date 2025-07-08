import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Query, ParseUUIDPipe } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { NATS_SERVICE } from '../../config/services';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { catchError } from 'rxjs';

@Controller('categories')
export class CategoriesController {
  
  constructor(
    @Inject(NATS_SERVICE) private readonly natsClient: ClientProxy
  ) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {

    return this.natsClient.send('create-category', createCategoryDto).pipe(
      catchError(err => {
        throw new RpcException(err)
      })
    );
    
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.natsClient.send('find-all-categories', paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {

     return this.natsClient.send('find-one-category', id)
      .pipe(
        catchError(err => {
          throw new RpcException(err)
        })
      );

  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updateCategoryDto: UpdateCategoryDto
  ) {

    return this.natsClient.send('update-category', {
      id, 
      ...updateCategoryDto 
    }).pipe(
      catchError(err => {
        throw new RpcException(err)
      })
    );

  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {

    return this.natsClient.send('remove-category', id)
      .pipe(
        catchError(err => {
          throw new RpcException(err)
        })
      );

  }

}
