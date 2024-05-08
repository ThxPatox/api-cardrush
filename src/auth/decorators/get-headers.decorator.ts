import { createParamDecorator, ExecutionContext, InternalServerErrorException } from "@nestjs/common";

export const GetHeadersDecorator = createParamDecorator((data,context:ExecutionContext)=>{
    // console.log('data',data);
    const request = context.switchToHttp().getRequest();
    const rawHeaders = request.rawHeaders;
    return rawHeaders;
})