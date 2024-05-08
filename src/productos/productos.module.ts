import { Module } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { ImagenProducto } from './entities/imagen-producto.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ProductosController],
  providers: [ProductosService],
  imports: [
    TypeOrmModule.forFeature([
      Producto,
      ImagenProducto
    ]),
    AuthModule
  ],
  exports: [ProductosService,TypeOrmModule]
})
export class ProductosModule {}
