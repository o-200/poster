import {
Resolver,
Query,
Mutation,
Args
} from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { Post } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';

@Resolver(of => Post)
export class PostsResolver {
  constructor(
    private readonly postsService: PostsService
  ) {}

  @Query(returns => [Post])
  async posts() {
    return this.postsService.findAll();
  }

  @Mutation(returns => Post)
  async createPost(
  @Args('createPostInput') createPostInput: CreatePostInput) {
    return this.postsService.create(createPostInput);
  }
}
