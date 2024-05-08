import { Injectable } from '@nestjs/common';
import { CreateTipoHabilidadDto } from './dto/create-tipo-habilidad.dto';
import { UpdateTipoHabilidadDto } from './dto/update-tipo-habilidad.dto';

@Injectable()
export class TipoHabilidadService {
  create(createTipoHabilidadDto: CreateTipoHabilidadDto) {
    return 'This action adds a new tipoHabilidad';
  }

  findAll() {
    return `This action returns all tipoHabilidad`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tipoHabilidad`;
  }

  update(id: number, updateTipoHabilidadDto: UpdateTipoHabilidadDto) {
    return `This action updates a #${id} tipoHabilidad`;
  }

  remove(id: number) {
    return `This action removes a #${id} tipoHabilidad`;
  }
}
