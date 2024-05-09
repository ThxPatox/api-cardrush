import { IsOptional, IsString } from "class-validator";
import { TipoHabilidad } from "src/tipo-habilidad/entities/tipo-habilidad.entity";

export class CreateHabilidadDto {

    @IsString()
    code:string;
    
    @IsString()
    descripcion?:string;

    @IsString()
    @IsOptional()
    tipoHabilidad?:TipoHabilidad;
}
