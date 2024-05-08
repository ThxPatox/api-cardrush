import { Injectable } from '@nestjs/common';
import { CreateTipoCartaDto } from './dto/create-tipo-carta.dto';
import { UpdateTipoCartaDto } from './dto/update-tipo-carta.dto';

@Injectable()
export class TipoCartaService {
  create(createTipoCartaDto: CreateTipoCartaDto) {
    return 'This action adds a new tipoCarta';
  }

  findAll() {
    return `This action returns all tipoCarta`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tipoCarta`;
  }

  update(id: number, updateTipoCartaDto: UpdateTipoCartaDto) {
    return `This action updates a #${id} tipoCarta`;
  }

  remove(id: number) {
    return `This action removes a #${id} tipoCarta`;
  }
}
