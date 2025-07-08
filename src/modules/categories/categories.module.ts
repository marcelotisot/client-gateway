import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
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
  controllers: [CategoriesController],
  providers: [],
})
export class CategoriesModule {}
