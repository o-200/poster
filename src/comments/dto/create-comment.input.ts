import { Field, InputType, ID } from '@nestjs/graphql';

@InputType()
export class CreateCommentInput {
  @Field()
  content: string;

  @Field(() => ID)
  authorId: string;

  @Field(() => ID)
  postId: string;
}
