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
import { CreateProductDto, UpdateProductDto } from './dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { NATS_SERVICE } from '../../config/services';
import { catchError } from 'rxjs';

@Controller('products')
export class ProductsController {

  constructor(
    @Inject(NATS_SERVICE) private readonly natsClient: ClientProxy
  ) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {

    return this.natsClient.send('create-product', createProductDto).pipe(
      catchError(err => {
        throw new RpcException(err)
      })
    );

  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    
    return this.natsClient.send('find-all-products', paginationDto).pipe(
      catchError(err => {
        throw new RpcException(err)
      })
    );

  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {

    return this.natsClient.send('find-one-product', id).pipe(
      catchError(err => {
        throw new RpcException(err)
      })
    );

  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updateProductDto: UpdateProductDto
  ) {

    return this.natsClient.send('update-product', {
      id, 
      ...updateProductDto 
    }).pipe(
      catchError(err => {
        throw new RpcException(err)
      })
    );

  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {

    return this.natsClient.send('remove-product', id).pipe(
      catchError(err => {
        throw new RpcException(err)
      })
    );

  }

}
