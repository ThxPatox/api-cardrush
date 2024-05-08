import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateRazaDto } from './dto/create-raza.dto';
import { UpdateRazaDto } from './dto/update-raza.dto';
import { Raza } from './entities/raza.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RazaService {
  private readonly logger = new Logger('ProductosService');
  constructor(
    @InjectRepository(Raza)
    private readonly razaRepository: Repository<Raza>,
  ) {}
  async create(createRazaDto: CreateRazaDto) {
    try {
      const raza = this.razaRepository.create(createRazaDto);
      await this.razaRepository.save(raza);
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
