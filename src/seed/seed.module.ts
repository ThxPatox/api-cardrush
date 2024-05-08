import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { ProductosModule } from 'src/productos/productos.module';
import { AuthModule } from 'src/auth/auth.module';
import { CartasModule } from 'src/cartas/cartas.module';
import { HabilidadModule } from 'src/habilidad/habilidad.module';
import { TipoHabilidadModule } from 'src/tipo-habilidad/tipo-habilidad.module';
import { RazaModule } from 'src/raza/raza.module';
import { ParametrosModule } from 'src/parametros/parametros.module';
import { TipoCartaModule } from 'src/tipo-carta/tipo-carta.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [ProductosModule,AuthModule,CartasModule,HabilidadModule,TipoHabilidadModule,RazaModule,ParametrosModule,TipoCartaModule],
})
export class SeedModule {}
