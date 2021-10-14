import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateHumanInput {
  @Field()
  name: string;
}
