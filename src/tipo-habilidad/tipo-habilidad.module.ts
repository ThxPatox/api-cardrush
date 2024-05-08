import { Module } from '@nestjs/common';
import { TipoHabilidadService } from './tipo-habilidad.service';
import { TipoHabilidadController } from './tipo-habilidad.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoHabilidad } from './entities/tipo-habilidad.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [TipoHabilidadController],
  providers: [TipoHabilidadService],
  imports: [
    TypeOrmModule.forFeature([
      TipoHabilidad
    ]),
    AuthModule
  ],
  exports: [TipoHabilidadService,TypeOrmModule]
})
export class TipoHabilidadModule {}
