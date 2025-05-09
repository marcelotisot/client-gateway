import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, ParseUUIDPipe } from '@nestjs/common';
import { CreateOrderDto } from './dto';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('orders')
export class OrdersController {
  constructor(
    // Inyectar NATS_SERVICE
    @Inject(NATS_SERVICE)
    private readonly client: ClientProxy
  ) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.client.send('create-order', createOrderDto);
  }

  /*@Get()
  findAll() {
    return this.ordersService.findAll();
  }*/

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const order = await firstValueFrom(
        this.client.send('find-one-order', {id})
      );

      return order;
    } catch (error) {
      throw new RpcException(error);
    }
  }

}
