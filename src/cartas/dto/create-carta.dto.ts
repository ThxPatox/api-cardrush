import { IsArray, IsNumber, IsOptional, IsString, MinLength } from "class-validator";
import { Raza } from "src/raza/entities/raza.entity";

export class CreateCartaDto {
    @IsString()
    @MinLength(3)
    nombre:string;

    @IsString()
    @MinLength(3)
    descripcion:string;

    @IsNumber()
    coste:number;

    @IsNumber()
    @IsOptional()
    salud?:number;
    
    @IsNumber()
    @IsOptional()
    ataque?:number;

    @IsString()
    @IsOptional()
    num_mejora?:string;

    @IsString()
    @IsOptional()
    raza?:Raza;

    @IsString()
    @IsOptional()
    habilidad?:Raza;

    @IsString({each:true})
    @IsOptional()
    @IsArray()
    imagen:string;
}
