import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCatInput {
  @Field()
  name: string;
  @Field()
  age: number;
  @Field()
  humanID: number;
}
