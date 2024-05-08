import { PartialType } from '@nestjs/swagger';
import { CreateTipoCartaDto } from './create-tipo-carta.dto';

export class UpdateTipoCartaDto extends PartialType(CreateTipoCartaDto) {}
