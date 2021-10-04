import { Int } from 'type-graphql';
import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Cats {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  catID?: number;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  age: number;
}
