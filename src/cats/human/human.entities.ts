import { Int } from 'type-graphql';
import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Cats } from '../cat.entities';

@ObjectType()
@Entity()
export class Humans {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  humanID?: number;

  @Column()
  @Field(() => String)
  name: string;

  @OneToMany(() => Cats, (cat) => cat.human)
  @Field(() => [Cats], { nullable: true })
  cats: Cats[];
}
