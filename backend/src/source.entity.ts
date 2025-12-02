import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sources')
export class Source {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  tel: string;

  @Column({ nullable: true })
  workingHours: string;

  @Column({ nullable: true })
  company: string;
}
