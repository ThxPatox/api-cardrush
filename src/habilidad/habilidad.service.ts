import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateHabilidadDto } from './dto/create-habilidad.dto';
import { UpdateHabilidadDto } from './dto/update-habilidad.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Habilidad } from './entities/habilidad.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HabilidadService  {
  private readonly logger = new Logger('HabilidadService');
  constructor(
    @InjectRepository(Habilidad)
    private readonly habilidadRepository: Repository<Habilidad>,
  ) {}
  async create(createHabilidadDto: CreateHabilidadDto) {
    try {
      const raza = this.habilidadRepository.create(createHabilidadDto);
      await this.habilidadRepository.save(raza);
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
