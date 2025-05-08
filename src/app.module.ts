import { Module } from '@nestjs/common';
import { CategoriesModule } from './modules/categories/categories.module';
import { NatsModule } from './modules/transports/nats.module';

@Module({
  imports: [
    CategoriesModule, 
    NatsModule
  ]
})
export class AppModule {}
