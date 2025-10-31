import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ReactionsService } from './reactions.service';
import { Reaction } from './entities/reaction.entity';
import { CreateReactionDto } from './dto/create-reaction.input';

@Resolver((of) => Reaction)
export class ReactionsResolver {
  constructor(private readonly reactionsService: ReactionsService) {}

  @Query((returns) => [Reaction])
  async reactions() {
    return this.reactionsService.findAll();
  }

  @Mutation((returns) => Reaction)
  async createReaction(
    @Args('createReactionDto') createReactionDto: CreateReactionDto,
  ) {
    return this.reactionsService.create(createReactionDto);
  }
}
