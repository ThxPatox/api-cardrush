import { Module } from '@nestjs/common';
import { CartasService } from './cartas.service';
import { CartasController } from './cartas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carta } from './entities/carta.entity';
import { ImagenCarta } from './entities/img-carta.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [CartasController],
  providers: [CartasService],
  imports: [
    TypeOrmModule.forFeature([
      Carta,
      ImagenCarta
    ]),
    AuthModule
  ],
  exports: [CartasService,TypeOrmModule]
})
export class CartasModule {}
