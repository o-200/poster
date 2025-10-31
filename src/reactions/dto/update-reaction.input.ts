import { CreateReactionDto } from './create-reaction.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateReactionInput extends PartialType(CreateReactionDto) {
  @Field(() => Int)
  id: number;
}
