import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Producto } from './entities/producto.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { PaginadorDto } from '../common/dto/paginador.dto';
import { validate as isUUID } from 'uuid';
import { ImagenProducto } from './entities/imagen-producto.entity';
import { User } from 'src/auth/entities/auth.entity';

@Injectable()
export class ProductosService {
  private readonly logger = new Logger('ProductosService');

  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
    @InjectRepository(Producto)
    private readonly imgProductoRepository: Repository<ImagenProducto>,

    private readonly dataSource: DataSource,
  ) {}

  async create(createProductoDto: CreateProductoDto,user:User) {
    try {
      // const { imagenes = [], ...productoDetalle } = createProductoDto;

      // const producto = this.productoRepository.create({
      //   ...productoDetalle,
      //   imagenes: imagenes.map((img) =>
      //     this.imgProductoRepository.create({ url: img }),
      //   ),
      //   user
      // });
      // await this.productoRepository.save(producto);
      // // return {...producto,imagenes:imagenes};
      // return producto;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll(PaginadorDto: PaginadorDto) {
    const { limit = 10, page = 0 } = PaginadorDto;
    const productos = await this.productoRepository.find({
      take: limit,
      skip: page * limit,
      relations: {
        imagenes: true,
      },
    });
    if (!productos) {
      throw new NotFoundException('No se encontraron productos');
    }
    return productos.map((producto) => ({
      ...producto,
      imagenes: producto.imagenes.map((img) => img.url),
    }));
  }

  async findOne(term: string) {
    let producto: Producto;
    if (isUUID(term)) {
      producto = await this.productoRepository.findOneBy({ id: term });
    } else {
      const queryBuilder = this.productoRepository.createQueryBuilder();
      producto = await queryBuilder
        .where('UPPER(name) = :name', { name: term.toUpperCase() })
        .leftJoinAndSelect('producto.imagenes', 'imagenes.producto')
        .getOne();
    }

    if (!producto) {
      throw new NotFoundException('Producto no encontrado: ' + term);
    }
    return producto;
  }

  async update(id: string, updateProductoDto: UpdateProductoDto,user:User) {
    try {
      const { imagenes, ...sobrante } = updateProductoDto;
      const producto = await this.productoRepository.preload({
        id: id,
        ...sobrante,
      });
      if (!producto) {
        throw new NotFoundException('Producto no encontrado: ' + id);
      }
      //Query Runner
      const Runner = this.dataSource.createQueryRunner();
      await Runner.connect();
      await Runner.startTransaction();
      try {
        if (imagenes) {
          await Runner.manager.delete(ImagenProducto, { producto: {id} });
          producto.imagenes = imagenes.map((img) =>this.imgProductoRepository.create({ url: img }));
        }
        // producto.user=user;
        await Runner.manager.save(producto);
        await Runner.commitTransaction();
        await Runner.release();
      } catch (error) {
        await Runner.rollbackTransaction();
        await Runner.release();
        this.handleExceptions(error);
      }
      // await this.productoRepository.save(producto);
      return producto;
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

  async eliminarTodoProducto() {
    const query = this.productoRepository.createQueryBuilder();
    try {
      return await query
      .delete()
      .where({})
      .execute();
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
