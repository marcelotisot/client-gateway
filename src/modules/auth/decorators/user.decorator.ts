import { 
  createParamDecorator, 
  ExecutionContext, 
  InternalServerErrorException 
} from '@nestjs/common';

// Decorador personalizado para extraer el user de la request

export const User = createParamDecorator(

  (data: string, ctx: ExecutionContext) => {

    const request = ctx.switchToHttp().getRequest();
    
    if (!request.user) {
      throw new InternalServerErrorException('User not found in request');
    }

    return request.user;

  },

);
