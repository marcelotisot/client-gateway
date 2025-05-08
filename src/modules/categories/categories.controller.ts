import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  Inject, 
  ParseUUIDPipe, 
  Query 
} from '@nestjs/common';

import { ClientProxy } from '@nestjs/microservices';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';
import { PaginationDto } from '../../common/dto/paginatio.dto';
import { NATS_SERVICE } from '../../config';

@Controller('categories')
export class CategoriesController {
  constructor(
    // Inyectar NATS_SERVICE
    @Inject(NATS_SERVICE)
    private readonly client: ClientProxy
  ) {}


  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.client.send('create-category', createCategoryDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.client.send('find-all-categories', paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.client.send('find-one-category', {id});
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updateCategoryDto: UpdateCategoryDto
  ) {
    return this.client.send('update-category', {
      id,
      ...updateCategoryDto
    });
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.client.send('delete-category', {id});
  }
}
