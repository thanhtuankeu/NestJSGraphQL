import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cats {
  @PrimaryGeneratedColumn()
  catID?: number;

  @Column()
  name: string;

  @Column()
  age: number;
}
