import { Module } from '@nestjs/common';
import { RazaService } from './raza.service';
import { RazaController } from './raza.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Raza } from './entities/raza.entity';

@Module({
  controllers: [RazaController],
  providers: [RazaService],
  imports: [
    TypeOrmModule.forFeature([  
      Raza
    ]),
  ],
  exports: [TypeOrmModule, RazaService]
})
export class RazaModule {}
