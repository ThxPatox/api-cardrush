import { IsArray, IsNumber, IsOptional, IsPositive, IsString, MinLength } from "class-validator";

export class CreateProductoDto {
    @IsString()
    @MinLength(3)
    nombre:string;

    @IsNumber()
    @IsOptional()
    @IsPositive()
    precio?:number;

    @IsString()
    @IsOptional()
    descripcion?:string;

    @IsString()
    @IsOptional()
    url?:string;

    @IsNumber()
    @IsOptional()
    @IsPositive()
    stock?:number;

    @IsString({each:true})
    @IsArray()
    sizes:string[]

    @IsString({each:true})
    @IsOptional()
    @IsArray()
    imagenes:string[]
}

