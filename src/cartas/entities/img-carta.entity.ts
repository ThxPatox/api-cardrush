import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Carta } from './carta.entity';

@Entity('tbl_imagenes_cartas')
export class ImagenCarta {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column('text')
  url: string;

  @OneToMany(() => Carta, carta => carta.imagenCarta)
  cartas: Carta[];
}
