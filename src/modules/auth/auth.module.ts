import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './auth.controller';
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
  controllers: [AuthController],
  providers: [],
})
export class AuthModule {}
