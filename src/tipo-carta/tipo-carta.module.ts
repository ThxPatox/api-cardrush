import { Module } from '@nestjs/common';
import { TipoCartaService } from './tipo-carta.service';
import { TipoCartaController } from './tipo-carta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoCarta } from './entities/tipo-carta.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [TipoCartaController],
  providers: [TipoCartaService],
  imports: [
    TypeOrmModule.forFeature([
      TipoCarta
    ]),
    AuthModule
  ],
  exports: [TipoCartaService,TypeOrmModule]
})
export class TipoCartaModule {}
