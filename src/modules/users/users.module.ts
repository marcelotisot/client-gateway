import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UsersController } from './users.controller';
import { NATS_SERVICE } from '../../config/services';
import { envs } from '../../config';

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
  controllers: [UsersController],
  providers: [],
})
export class UsersModule {}
