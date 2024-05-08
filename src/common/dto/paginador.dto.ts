import { Type } from "class-transformer";
import { IsOptional, IsPositive, Min } from "class-validator";

export class PaginadorDto {

    @IsOptional()
    @IsPositive()
    @Type(() => Number)
    limit: number;

    @IsOptional()
    // @IsPositive()
    @Min(0)
    @Type(() => Number)
    page: number;
}