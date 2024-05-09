import { HabilidadService } from './../habilidad/habilidad.service';
import { Injectable, Logger } from '@nestjs/common';
import { ProductosService } from '../productos/productos.service';
import { initialDataDB } from './seed-data';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/auth.entity';
import { DataSource, getConnection, Repository } from 'typeorm';
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
import { CreateTipoHabilidadDto } from 'src/tipo-habilidad/dto/create-tipo-habilidad.dto';
import { TipoHabilidadService } from '../tipo-habilidad/tipo-habilidad.service';
import { CreateHabilidadDto } from 'src/habilidad/dto/create-habilidad.dto';
@Injectable()
export class SeedService {
  private readonly logger = new Logger('SeedService');
  constructor(
    private readonly dataSource: DataSource,
    private readonly productosService: ProductosService,
    private readonly cartasService: CartasService,
    private readonly razaService: RazaService,
    private readonly tipoHabilidadService: TipoHabilidadService,
    private readonly habilidadService: HabilidadService,
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
    const { cartas, usuarios, razas, tipo_habilidades, habilidades } =
      _roboCard;

    const promesaRazas = razas.map(async (raza) => {
      const razacreada: CreateRazaDto = {
        code: raza.code,
        descripcion: raza.descripcion,
      };
      return await this.razaService.create(razacreada); // Await each race creation
    });
    const razasInsertadas: Raza[] = await Promise.all(promesaRazas);
    const promesaTipoHabilidad = tipo_habilidades.map(async (tipoHab) => {
      const tipoHabilidadcreada: CreateTipoHabilidadDto = {
        code: tipoHab.code,
        descripcion: tipoHab.descripcion,
        efecto: tipoHab.efecto,
        tipo: tipoHab.tipo,
      };
      return await this.tipoHabilidadService.create(tipoHabilidadcreada); // Await each race creation
    });
    const tipoHabilidadesInsertadas: TipoHabilidad[] =
      await Promise.all(promesaTipoHabilidad);
    const promesaHabilidad = habilidades.map(async (Hab) => {
      const Habilidadcreada: CreateHabilidadDto = {
        code: Hab.code,
        descripcion: Hab.descripcion,
      };
      return await this.habilidadService.create(Habilidadcreada); // Await each race creation
    });
    const HabilidadesInsertadas = await Promise.all(promesaHabilidad);
    const promesaJoinsTipoHabilidad = await this.RetornarLosJoinsTipoHabilidad(
      HabilidadesInsertadas,
      tipoHabilidadesInsertadas,
    );
    const promesaJoins = await this.RetornarLosJoins(
      HabilidadesInsertadas,
      cartas,
    );
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
        const buscarSiTieneHabilidad = promesaJoins.find((join) => {
          const x = join.tblCartaId === carta.id;
          if (x) {
            console.log('*****************', join);
            return join;
          }
        });
        const cartacreada: CreateCartaDto = {
          nombre: carta.name,
          descripcion: carta.text,
          coste: carta.battlegrounds.tier,
          salud: carta.health,
          ataque: carta.attack,
          raza: tipo,
          imagen: null,
          num_mejora: buscarSiTieneHabilidad?.puntoMejora || '0',
          habilidad: buscarSiTieneHabilidad?.tblHabilidadesId || null,
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
  private async RetornarLosJoinsTipoHabilidad(
    habilidadesIns: Habilidad[],
    tipoHabilidadesIns: TipoHabilidad[],
  ) {
    let join_habilidades_tipo_habilidad: {
      tblHabilidadesId: string;
      tblTipoHabilidadId: string;
    }[] = [];
    //UPGRADE-MINION
    let idTipoHabilidad: TipoHabilidad = tipoHabilidadesIns.find(
      (tipoHabilidad) =>
        tipoHabilidad.code === 'UPGRADE' && tipoHabilidad.efecto === 'MINION',
    );
    let idHabilidad: Habilidad = habilidadesIns.find(
      (habilidad) => habilidad.code === 'SURGIR',
    );
    //PUSH
    join_habilidades_tipo_habilidad.push({
      tblHabilidadesId: idHabilidad.id,
      tblTipoHabilidadId: idTipoHabilidad.id,
    });
    idHabilidad = habilidadesIns.find(
      (habilidad) => habilidad.code === 'AGONIA',
    );
    //PUSH
    join_habilidades_tipo_habilidad.push({
      tblHabilidadesId: idHabilidad.id,
      tblTipoHabilidadId: idTipoHabilidad.id,
    });
    //UPGRADE-MESA
    idTipoHabilidad = tipoHabilidadesIns.find(
      (tipoHabilidad) =>
        tipoHabilidad.code === 'UPGRADE' && tipoHabilidad.efecto === 'MESA',
    );
    idHabilidad = habilidadesIns.find(
      (habilidad) => habilidad.code === 'SURGIR',
    );
    //PUSH
    join_habilidades_tipo_habilidad.push({
      tblHabilidadesId: idHabilidad.id,
      tblTipoHabilidadId: idTipoHabilidad.id,
    });
    idHabilidad = habilidadesIns.find(
      (habilidad) => habilidad.code === 'AGONIA',
    );
    //PUSH
    join_habilidades_tipo_habilidad.push({
      tblHabilidadesId: idHabilidad.id,
      tblTipoHabilidadId: idTipoHabilidad.id,
    });

    // Insertar manualmente las relaciones en la tabla de unión
    const promesa = await this.insertarRelacionesJoin(
      join_habilidades_tipo_habilidad,
    );
    return Promise.all([promesa]);
  }
  private async RetornarLosJoins(habilidadesIns: Habilidad[], cartas: any[]) {
    let join_carta_habilidades = [];
    cartas.forEach((carta) => {
      if (
        carta.text.toUpperCase().includes('GRITO DE BATALLA') &&
        carta.text
          .toUpperCase()
          .includes(
            'OTORGA +' || carta.text.toUpperCase().includes('OTORGAN +'),
          )
      ) {
        join_carta_habilidades.push({
          puntoMejora: this.quitarStats(carta.text),
          tblCartaId: carta.id,
          tblHabilidadesId: habilidadesIns.find(
            (habilidad) => habilidad.code === 'SURGIR',
          ).id,
        });
      }
      if (
        carta.text.toUpperCase().includes('ÚLTIMO ALIENTO') &&
        carta.text
          .toUpperCase()
          .includes(
            'OTORGA +' || carta.text.toUpperCase().includes('OTORGAN +'),
          )
      ) {
        join_carta_habilidades.push({
          puntoMejora: this.quitarStats(carta.text),
          tblCartaId: carta.id,
          tblHabilidadesId: habilidadesIns.find(
            (habilidad) => habilidad.code === 'AGONIA',
          ).id,
        });
      }
    });
    // console.log(join_carta_habilidades);
    return join_carta_habilidades;
  }
  quitarStats(texto: string): string | null {
    const regex = /\+(\d+)(\/\+(\d+))?/;
    const match = texto.match(regex);
    if (match) {
      const bonus1 = match[1];
      const bonus2 = match[3];
      if (bonus1 && bonus2) {
        return `${bonus1}/${bonus2}`;
      } else if (bonus1) {
        return bonus1;
      }
    } else {
      console.log('No se encontró el patrón en el texto.');
    }
    return null;
  }
  private async insertarRelacionesJoin(relaciones: any[]) {
    relaciones = this.eliminarDuplicados(relaciones);
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      for (const relacion of relaciones) {
        await queryRunner.manager
          .createQueryBuilder()
          .insert()
          .into('join_habilidades_tipo_habilidad')
          .values(relacion)
          .execute();
      }
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
  eliminarDuplicados(relaciones) {
    // Utilizar un conjunto para almacenar combinaciones únicas de tblHabilidadesId y tblTipoHabilidadId
    const conjunto = new Set();
    // Filtrar el arreglo de relaciones para eliminar duplicados
    const relacionesUnicas = relaciones.filter((relacion) => {
      // Convertir la relación a una cadena para comparación
      const clave = `${relacion.tblHabilidadesId}-${relacion.tblTipoHabilidadId}`;
      // Verificar si la combinación ya está en el conjunto
      if (conjunto.has(clave)) {
        // Si ya existe, es un duplicado, entonces retornar false para eliminarlo
        return false;
      } else {
        // Si no existe, agregarlo al conjunto y retornar true para mantenerlo
        conjunto.add(clave);
        return true;
      }
    });
    return relacionesUnicas;
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
    return await Promise.all([
      promesaDeUser,
      promesaDeCarta,
      promesaDeHabilidad,
      promesaDeTipoHabilidad,
      promesaDeRaza,
      promesaDeParametro,
      promesaDeTipoCarta,
    ]);
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
