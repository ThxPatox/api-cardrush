import { IsString } from "class-validator";

export class CreateRazaDto {

    @IsString()
    code:string;
    
    @IsString()
    descripcion?:string;
}
