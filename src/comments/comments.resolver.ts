import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CommentsService } from './comments.service';

import { CreateCommentInput } from './dto/create-comment.input';
import { Comment } from './entities/comment.entity';

@Resolver(() => Comment)
export class CommentsResolver {
  constructor(private readonly commentsService: CommentsService) {}

  @Query(() => [Comment])
  async comments() {
    return this.commentsService.findAll();
  }

  @Mutation(() => Comment)
  async createComment(
    @Args('createCommentDto') createCommentInput: CreateCommentInput,
  ) {
    return this.commentsService.create(createCommentInput);
  }
}
