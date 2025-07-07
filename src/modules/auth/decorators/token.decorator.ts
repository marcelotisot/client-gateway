import { 
  createParamDecorator, 
  ExecutionContext, 
  InternalServerErrorException 
} from '@nestjs/common';

// Decorador personalizado para extraer el token de la request

export const Token = createParamDecorator(

  (data: string, ctx: ExecutionContext) => {

    const request = ctx.switchToHttp().getRequest();
    
    if (!request.token) {
      throw new InternalServerErrorException('Token not found in request');
    }

    return request.token;

  },

);