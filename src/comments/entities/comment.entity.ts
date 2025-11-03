import { ObjectType, Field } from '@nestjs/graphql';
import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
export class Comment {
  @Field()
  id: string;

  @Field()
  content: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => User)
  author: User;

  @Field(() => Post)
  post: Post;

  @Field()
  isDeleted: boolean;
}
