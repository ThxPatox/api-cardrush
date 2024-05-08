import { PartialType } from '@nestjs/swagger';
import { CreateHabilidadDto } from './create-habilidad.dto';

export class UpdateHabilidadDto extends PartialType(CreateHabilidadDto) {}
