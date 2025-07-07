import { 
  Body, 
  Controller, 
  Get, 
  Inject, 
  Post, 
  UseGuards 
} from '@nestjs/common';

import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from '../../config/services';
import { CreateUserDto } from '../users/dto';
import { LoginUserDto } from './dto';
import { catchError } from 'rxjs';
import { AuthGuard } from './guards/auth.guard';
import { Token, User } from './decorators';
import { CurrentUser } from './interfaces/current-user.interface';

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

  @UseGuards(AuthGuard)
  @Get('verify')
  verifyToken(
    @User() user: CurrentUser, // Extraer user
    @Token() token: string, // Extraer token
  ) {

    return { user, token };

  }

}
