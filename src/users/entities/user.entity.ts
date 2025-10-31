import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  bio?: string;

  @Field(() => [String], { nullable: 'itemsAndList' })
  preferences?: string[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
