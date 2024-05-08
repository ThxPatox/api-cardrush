import { Module } from '@nestjs/common';
import { ParametrosService } from './parametros.service';
import { ParametrosController } from './parametros.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parametro } from './entities/parametro.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ParametrosController],
  providers: [ParametrosService],
  imports: [
    TypeOrmModule.forFeature([
      Parametro
    ]),
    AuthModule
  ],
  exports: [ParametrosService,TypeOrmModule]
})
export class ParametrosModule {}
