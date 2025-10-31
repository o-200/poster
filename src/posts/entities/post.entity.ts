import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Post {
  @Field()
  id: string;

  @Field()
  content: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field()
  isDeleted: boolean;
}
