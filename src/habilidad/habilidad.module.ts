import { Module } from '@nestjs/common';
import { HabilidadService } from './habilidad.service';
import { HabilidadController } from './habilidad.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Habilidad } from './entities/habilidad.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [HabilidadController],
  providers: [HabilidadService],
  imports: [
    TypeOrmModule.forFeature([
      Habilidad
    ]),
    AuthModule
  ],
  exports: [HabilidadService,TypeOrmModule]
})
export class HabilidadModule {}
