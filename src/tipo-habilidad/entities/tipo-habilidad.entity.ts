import { Habilidad } from 'src/habilidad/entities/habilidad.entity';
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_tipo_habilidad')
export class TipoHabilidad {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  code: string;

  @Column('text')
  descripcion: string;

  @Column('text')
  efecto: string;

  @Column('text')
  tipo: string;

  @ManyToMany(() => Habilidad, habilidades => habilidades.tiposHabilidades)
  habilidades: Habilidad[];
}
