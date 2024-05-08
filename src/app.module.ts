import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductosModule } from './productos/productos.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ArchivosModule } from './archivos/archivos.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { CartasModule } from './cartas/cartas.module';
import { ParametrosModule } from './parametros/parametros.module';
import { TipoHabilidadModule } from './tipo-habilidad/tipo-habilidad.module';
import { TipoCartaModule } from './tipo-carta/tipo-carta.module';
import { HabilidadModule } from './habilidad/habilidad.module';
import { RazaModule } from './raza/raza.module';
@Module({
  imports: [ConfigModule.forRoot({}),
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    autoLoadEntities: true,
    synchronize: true,
  }),
  ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'public')
  }),
  ProductosModule,
  CommonModule,
  SeedModule,
  ArchivosModule,
  AuthModule,
  CartasModule,
  ParametrosModule,
  TipoHabilidadModule,
  TipoCartaModule,
  HabilidadModule,
  RazaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
