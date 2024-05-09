import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateTipoHabilidadDto } from './dto/create-tipo-habilidad.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TipoHabilidad } from './entities/tipo-habilidad.entity';

@Injectable()
export class TipoHabilidadService {
  private readonly logger = new Logger('TipoHabilidadService');
  constructor(
    @InjectRepository(TipoHabilidad)
    private readonly tipoHabilidadRepository: Repository<TipoHabilidad>,
  ) {}
  async create(createRazaDto: CreateTipoHabilidadDto) {
    try {
      const raza = this.tipoHabilidadRepository.create(createRazaDto);
      await this.tipoHabilidadRepository.save(raza);
      return raza;
    } catch (error) {
      this.handleExceptions(error);
    }
  }
  private handleExceptions(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    this.logger.error(error);
    throw new InternalServerErrorException('Error con la base de datos');
  }
}
