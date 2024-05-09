import { Carta } from 'src/cartas/entities/carta.entity';
import { TipoHabilidad } from 'src/tipo-habilidad/entities/tipo-habilidad.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('tbl_habilidades')
export class Habilidad {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  code: string;

  @Column('text')
  descripcion: string;

  
  @ManyToMany(() => TipoHabilidad, tipoHabilidad => tipoHabilidad.habilidades, { eager: true })
  @JoinTable({name:'join_habilidades_tipo_habilidad'})
  tiposHabilidades: TipoHabilidad;

  @OneToMany(() => Carta, carta => carta.habilidad)
  cartas: Carta[];
}
