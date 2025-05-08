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
import { CreateProductDto, UpdateProductDto } from './dto';
import { PaginationDto } from '../../common/dto/paginatio.dto';
import { NATS_SERVICE } from '../../config';

@Controller('products')
export class ProductsController {
  constructor(
    // Inyectar NATS_SERVICE
    @Inject(NATS_SERVICE)
    private readonly client: ClientProxy
  ) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.client.send('create-product', createProductDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.client.send('find-all-products', paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.client.send('find-one-product', {id});
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updateProductDto: UpdateProductDto
  ) {
    return this.client.send('update-product', {
      id,
      ...updateProductDto
    });
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.client.send('delete-product', {id});
  }

  @Get('find/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.client.send('find-product-by-slug', {slug});
  }
}
