import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_parametros')
export class Parametro {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  code: string;

  @Column('text')
  descripcion: string;

  @Column('text')
  valor: string;
}
