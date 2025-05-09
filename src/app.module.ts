import { Module } from '@nestjs/common';
import { CategoriesModule } from './modules/categories/categories.module';
import { NatsModule } from './modules/transports/nats.module';
import { ProductsModule } from './modules/products/products.module';
import { OrdersModule } from './modules/orders/orders.module';

@Module({
  imports: [
    CategoriesModule, 
    NatsModule, 
    ProductsModule, 
    OrdersModule
  ]
})
export class AppModule {}
