import { Field, ObjectType } from '@nestjs/graphql';
import { Int } from 'type-graphql';

@ObjectType()
export class CatsDTO {
  @Field(() => Int)
  catID?: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  age: number;
}
