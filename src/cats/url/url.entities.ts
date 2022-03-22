import { Int } from 'type-graphql';
import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Url {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  urlID?: number;

  @Column()
  @Field(() => String)
  link: string;

  @Column({ nullable: true })
  @Field(() => String)
  shortURL: string;
}
