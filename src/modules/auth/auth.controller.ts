import { Body, Controller, Inject, Post } from '@nestjs/common';
import { NATS_SERVICE } from '../../config/services';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CreateUserDto } from '../users/dto';
import { LoginUserDto } from './dto';
import { catchError } from 'rxjs';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(NATS_SERVICE) private readonly natsClient: ClientProxy
  ) {}

  @Post('register')
  register(@Body() registerUserDto: CreateUserDto) {

    return this.natsClient.send('register-user', registerUserDto).pipe(
      catchError(err => {
        throw new RpcException(err);
      })
    );
    
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {

    return this.natsClient.send('login-user', loginUserDto).pipe(
      catchError(err => {
        throw new RpcException(err);
      })
    );
    
  }
}
