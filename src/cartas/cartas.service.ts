import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateCartaDto } from './dto/create-carta.dto';
import { UpdateCartaDto } from './dto/update-carta.dto';
import { Carta } from './entities/carta.entity';
import { ImagenCarta } from './entities/img-carta.entity';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/auth.entity';
import { PaginadorDto } from 'src/common/dto/paginador.dto';
import { isUUID } from 'class-validator';

@Injectable()
export class CartasService {
  private readonly logger = new Logger('ProductosService');

  constructor(
    @InjectRepository(Carta)
    private readonly productoRepository: Repository<Carta>,
    @InjectRepository(Carta)
    private readonly imgProductoRepository: Repository<ImagenCarta>,

    private readonly dataSource: DataSource,
  ) {}
  async create(createCartaDto: CreateCartaDto, user: User) {
    try {
      const { imagen, ...productoDetalle } = createCartaDto;

      const producto = this.productoRepository.create({
        ...productoDetalle,
        user,
      });
      await this.productoRepository.save(producto);
      return producto;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll(PaginadorDto: PaginadorDto) {
    const { limit = 10, page = 0 } = PaginadorDto;
    const productos = await this.productoRepository.find({
      take: limit,
      skip: page * limit
    });
    if (!productos) {
      throw new NotFoundException('No se encontraron productos');
    }
    return productos
  }

  async findOne(id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('El id no es válido');
    }
    const producto = await this.productoRepository.findOneBy({ id });
    if (!producto) {
      throw new NotFoundException('No se encontró el producto: ' + id);
    }
    return producto;
  }

  async update(id: string, updateCartaDto: UpdateCartaDto,user:User) {
    try {
      const { imagen, ...productoDetalle } = updateCartaDto;
      const producto = await this.productoRepository.findOneBy({id});
      if (!producto) {
        throw new NotFoundException('No se encontró el producto');
      }
      // if (producto.user.id !== user.id) {
      //   throw new BadRequestException('No puedes editar este producto');
      // }
      await this.productoRepository.update(id, {
        ...productoDetalle,
      });
      return await this.productoRepository.findOneBy({id});
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    const producto = this.productoRepository.findOneBy({ id });
    if (!producto) {
      throw new NotFoundException('Producto no encontrado: ' + id);
    }
    return this.productoRepository.delete(id);
  }

  private handleExceptions(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    this.logger.error(error);
    throw new InternalServerErrorException('Error con la base de datos');
  }
}
