import { Injectable, Logger } from '@nestjs/common';
import { ProductosService } from '../productos/productos.service';
import { initialDataDB } from './seed-data';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/auth.entity';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import { CreateCartaDto } from 'src/cartas/dto/create-carta.dto';
import { CartasService } from 'src/cartas/cartas.service';
import { _roboCard } from './seed-carta.data';
import { Carta } from 'src/cartas/entities/carta.entity';
import { Habilidad } from 'src/habilidad/entities/habilidad.entity';
import { TipoHabilidad } from 'src/tipo-habilidad/entities/tipo-habilidad.entity';
import { Raza } from 'src/raza/entities/raza.entity';
import { Parametro } from 'src/parametros/entities/parametro.entity';
import { TipoCarta } from 'src/tipo-carta/entities/tipo-carta.entity';
import { CreateRazaDto } from 'src/raza/dto/create-raza.dto';
import { RazaService } from 'src/raza/raza.service';
@Injectable()
export class SeedService {
  private readonly logger = new Logger('SeedService');
  constructor(
    private readonly productosService: ProductosService,
    private readonly cartasService: CartasService,
    private readonly razaService: RazaService,
    private readonly AuthService: AuthService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Carta)
    private readonly cartaRepository: Repository<Carta>,
    @InjectRepository(Habilidad)
    private readonly habilidadRepository: Repository<Habilidad>,
    @InjectRepository(TipoHabilidad)
    private readonly tipoHabilidadRepository: Repository<TipoHabilidad>,
    @InjectRepository(Raza)
    private readonly razaRepository: Repository<Raza>,
    @InjectRepository(Parametro)
    private readonly parametroRepository: Repository<Parametro>,
    @InjectRepository(TipoCarta)
    private readonly tipoCartaRepository: Repository<TipoCarta>,
  ) {}

  async RunSeed() {
    console.log('Poblando base de datos');
    // return this.InsertarProductos();
    await this.EliminarTablas();
    const firstUser = await this.InsertarUsuarios();
    await this.InsertarProductos(firstUser);
    return 'Base de datos poblada';
  }

  async RunSeedCard() {
    await this.EliminarTablas();
    const firstUser = await this.InsertarUsuarios();
    return await this.InsertarCards(firstUser);
  }
  private async InsertarCards(user: User) {
    const { cartas, usuarios, razas } = _roboCard;

    const promesaRazas = razas.map(async (raza) => {
      const razacreada: CreateRazaDto = {
        code: raza.code,
        descripcion: raza.descripcion,
      };
      return await this.razaService.create(razacreada); // Await each race creation
    });
    const razasInsertadas = await Promise.all(promesaRazas); // Wait for all race insertions to complete
    console.log('Razas insertadas:', razasInsertadas);

    const nombresCartasInsertadas = new Set();
    const promesaProductos = [];
    cartas.forEach((carta) => {
      if (!nombresCartasInsertadas.has(carta.name)) {
        let tipo;
        if (carta.minionTypeId === 43) {
          //jabaespin
          tipo = razasInsertadas.find((raza) => raza.code === 'PERROS');
        } else if (carta.minionTypeId === 14) {
          //murloc
          tipo = razasInsertadas.find((raza) => raza.code === 'GATOS');
        } else if (carta.minionTypeId === 26) {
          //todo
          tipo = razasInsertadas.find((raza) => raza.code === 'TODOS');
        }
        const cartacreada: CreateCartaDto = {
          nombre: carta.name,
          coste: carta.battlegrounds.tier,
          salud: carta.health,
          ataque: carta.attack,
          raza: tipo,
          imagen: null,
        };
        nombresCartasInsertadas.add(carta.name);
        promesaProductos.push(this.cartasService.create(cartacreada, user));
      } else {
        this.logger.error(`Carta ${carta.name} ya insertada`);
      }
    });
    const promesa = await Promise.all([promesaProductos]);
    // return promesa;
    return 'Cartas insertadas';
  }

  private async EliminarTablas() {

    // await this.productosService.eliminarTodoProducto();
    // await this.userRepository.clear();
    const promesaDeUser = this.userRepository
    .createQueryBuilder()
    .delete()
    .where({})
    .execute();
    const promesaDeCarta = this.cartaRepository
      .createQueryBuilder()
      .delete()
      .where({})
      .execute();
    const promesaDeHabilidad = this.habilidadRepository
      .createQueryBuilder()
      .delete()
      .where({})
      .execute();
    const promesaDeTipoHabilidad = this.tipoHabilidadRepository
      .createQueryBuilder()
      .delete()
      .where({})
      .execute();
    const promesaDeRaza = this.razaRepository
      .createQueryBuilder()
      .delete()
      .where({})
      .execute();
    const promesaDeParametro = this.parametroRepository
      .createQueryBuilder()
      .delete()
      .where({})
      .execute();
    const promesaDeTipoCarta = this.tipoCartaRepository
      .createQueryBuilder()
      .delete()
      .where({})
      .execute();
    return await Promise.all([promesaDeUser, promesaDeCarta, promesaDeHabilidad, promesaDeTipoHabilidad, promesaDeRaza, promesaDeParametro, promesaDeTipoCarta])
  }
  private async InsertarUsuarios() {
    const { usuarios } = _roboCard;
    const users = [];
    usuarios.forEach((usuario) => {
      users.push(this.AuthService.create(usuario));
    });
    const promesa = await Promise.all(users);
    return promesa[0];
  }
  private async InsertarProductos(user: User) {
    this.productosService.eliminarTodoProducto();
    const { productos, usuarios } = initialDataDB;
    const promesaProductos = [];
    productos.forEach((producto) => {
      promesaProductos.push(this.productosService.create(producto, user));
    });
    const promesa = await Promise.all(promesaProductos);
    // return promesa;
    return 'Productos insertados';
  }
}
