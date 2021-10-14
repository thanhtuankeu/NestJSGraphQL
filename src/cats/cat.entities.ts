import { Int } from 'type-graphql';
import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Humans } from './human/human.entities';

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

  @ManyToOne(() => Humans, (human) => human.cats)
  @Field(() => Humans, { nullable: true })
  human: Humans;

  @Column({ nullable: true })
  @Field({ nullable: true })
  humanID: number;
}
