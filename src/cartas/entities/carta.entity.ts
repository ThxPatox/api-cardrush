import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ImagenCarta } from './img-carta.entity';
import { User } from 'src/auth/entities/auth.entity';
import { TipoCarta } from 'src/tipo-carta/entities/tipo-carta.entity';
import { Habilidad } from 'src/habilidad/entities/habilidad.entity';
import { Raza } from 'src/raza/entities/raza.entity';

@Entity('tbl_cartas')
export class Carta {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text',{unique:true})
  nombre: string;

  @Column('text')
  descripcion: string;

  @Column('numeric')
  coste: number;

  @Column('numeric', { default: 0 })
  salud: number;

  @Column('numeric', { default: 0 })
  ataque: number;

  @Column('text')
  num_mejora: string;
  
  @ManyToOne(() => TipoCarta, tipoCarta => tipoCarta.cartas, { eager: true })
  @JoinColumn()
  tipoCarta: TipoCarta;

  @ManyToOne(() => Raza, tipoCarta => tipoCarta.cartas, { eager: true })
  @JoinColumn()
  raza: Raza;

  @ManyToOne(() => Habilidad, habilidad => habilidad.cartas, { eager: true })
  @JoinColumn()
  habilidad: Habilidad;

  @ManyToOne(() => ImagenCarta, imagenCarta => imagenCarta.cartas, { eager: true })
  imagenCarta: ImagenCarta;

  @ManyToOne(() => User, (user) => user.cartas, { eager: true })
  user: User;
}
