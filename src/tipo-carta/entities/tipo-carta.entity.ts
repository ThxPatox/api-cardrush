import { Carta } from 'src/cartas/entities/carta.entity';
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_tipo_carta')
export class TipoCarta {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text',{unique:true})
  code: string;

  @Column('text')
  descripcion: string;

  @OneToMany(() => Carta, carta => carta.tipoCarta)
  cartas: Carta[];
  
}
