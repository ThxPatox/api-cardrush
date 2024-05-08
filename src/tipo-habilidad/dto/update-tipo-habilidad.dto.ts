import { PartialType } from '@nestjs/swagger';
import { CreateTipoHabilidadDto } from './create-tipo-habilidad.dto';

export class UpdateTipoHabilidadDto extends PartialType(CreateTipoHabilidadDto) {}
