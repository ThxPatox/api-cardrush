import { Carta } from "src/cartas/entities/carta.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('tbl_razas')
export class Raza {
    
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text',{unique:true})
  code: string;

  @Column('text')
  descripcion: string;

  @OneToMany(() => Carta, carta => carta.tipoCarta)
  cartas: Carta[];
}
