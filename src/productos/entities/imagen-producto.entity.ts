import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Producto } from './producto.entity';

@Entity('tbl_imagenes_productos')
export class ImagenProducto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  url: string;

  @ManyToOne(
    () => Producto,
    (producto) => producto.imagenes,
    { onDelete: 'CASCADE' },
  )
  producto:Producto;
}
