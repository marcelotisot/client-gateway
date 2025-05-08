import { Module } from '@nestjs/common';
import { CategoriesModule } from './modules/categories/categories.module';
import { NatsModule } from './modules/transports/nats.module';
import { ProductsModule } from './modules/products/products.module';

@Module({
  imports: [
    CategoriesModule, 
    NatsModule, ProductsModule
  ]
})
export class AppModule {}
