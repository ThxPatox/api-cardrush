import { Injectable } from '@nestjs/common';
import { CreateHabilidadDto } from './dto/create-habilidad.dto';
import { UpdateHabilidadDto } from './dto/update-habilidad.dto';

@Injectable()
export class HabilidadService {
  create(createHabilidadDto: CreateHabilidadDto) {
    return 'This action adds a new habilidad';
  }

  findAll() {
    return `This action returns all habilidad`;
  }

  findOne(id: number) {
    return `This action returns a #${id} habilidad`;
  }

  update(id: number, updateHabilidadDto: UpdateHabilidadDto) {
    return `This action updates a #${id} habilidad`;
  }

  remove(id: number) {
    return `This action removes a #${id} habilidad`;
  }
}
