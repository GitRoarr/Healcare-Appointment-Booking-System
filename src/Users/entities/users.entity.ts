import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  email: string;
  @Column()
  bio: string;
  @Column('varchar', { nullable: true })
  phone: string;
  @Column({ default: 'Patient' })
  role: string;
  @Column()
  gender: string;
  @Column()
  departement: string;
}
