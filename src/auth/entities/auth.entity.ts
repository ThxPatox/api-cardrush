import { Carta } from 'src/cartas/entities/carta.entity';
import { Producto } from 'src/productos/entities/producto.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('tbl_usuarios')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
  })
  username: string;

  @Column('text',{select:false})
  password: string;

  @Column('text', {
    unique: true,
  })
  email: string;

  @Column('bool', {
    default: true,
  })
  isActive: boolean;

  @Column('text', {
    array: true,
    default: ['user'],
  })
  roles: string[];  
  
  @OneToMany(
    () => Carta,
    (carta) => carta,
  )
  cartas: Carta[];

  @BeforeInsert()
  CheckearFilasCreate() {
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  CheckearFilasUpdate() {
    this.CheckearFilasCreate();
  }
}
