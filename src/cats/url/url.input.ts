import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUrlInput {
  @Field()
  link: string;
}
