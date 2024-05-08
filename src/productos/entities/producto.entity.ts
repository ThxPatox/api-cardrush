import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ImagenProducto } from './imagen-producto.entity';
import { User } from 'src/auth/entities/auth.entity';

@Entity('tbl_productos')
export class Producto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    nullable: false,
    unique: true,
  })
  nombre: string;

  @Column('float', {
    default: 0,
  })
  precio: number;

  @Column('text', {
    nullable: true,
  })
  descripcion: string;

  @Column('text', {
    unique: true,
  })
  url: string;

  @Column('numeric', {
    default: 0,
  })
  stock: number;

  @Column('text', {
    array: true,
  })
  sizes: string[];

  @OneToMany(
    () => ImagenProducto,
    (ImagenProducto) => ImagenProducto.producto,
    { cascade: true, eager: true},
  )
  imagenes?: ImagenProducto[];

  // @ManyToOne(
  //   () => User,
  //   (user) => user.producto,
  //   { eager: true },
  // )
  // user: User;


  @BeforeInsert()
  setUrl() {
    if (!this.url) {
      this.url = 'https://www.paginacion.com/' + this.nombre;
    }
  }
  @BeforeUpdate()
  ValidarDescripcion() {
    this.descripcion = this.descripcion + ' - Actualizado';
  }
}
