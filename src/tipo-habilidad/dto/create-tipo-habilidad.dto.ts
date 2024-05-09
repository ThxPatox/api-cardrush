import { IsOptional, IsString } from "class-validator";

export class CreateTipoHabilidadDto {

    @IsString()
    code:string;
    
    @IsString()
    descripcion?:string;

    @IsString()
    efecto:string;

    @IsString()
    @IsOptional()
    tipo?:string;
}
