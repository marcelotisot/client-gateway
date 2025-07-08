import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProductsController } from './products.controller';
import { NATS_SERVICE } from '../../config/services';
import { envs } from '../../config/envs';

@Module({
  imports: [

    ClientsModule.register([
      {
        name: NATS_SERVICE,
        transport: Transport.NATS,
        options: {
          servers: envs.natsServers,
        }
      }
    ]),

  ],
  controllers: [ProductsController],
  providers: [],
})
export class ProductsModule {}
