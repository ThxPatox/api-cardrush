import { createParamDecorator, ExecutionContext, InternalServerErrorException } from "@nestjs/common";

export const GetUserDecorator = createParamDecorator((data,context:ExecutionContext)=>{
    // console.log('data',data);
    let user;
    if(!data){

        const request = context.switchToHttp().getRequest();
        user = request.user;
    }else{
        const request = context.switchToHttp().getRequest();
        user = request.user[data];
    }
        
    if(!user){
        throw new InternalServerErrorException('Usuario no encontrado (request)');
    }
    return user;
})