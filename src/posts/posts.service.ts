import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './schemas/post.schema';
import { CreatePostInput } from './dto/create-post.input';


@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<Post>
  ) {}

  async findAll(): Promise<Post[]> {
    return this.postModel.find().exec();
  }

  async create(createPostInput: CreatePostInput): Promise<Post> {
    const createdPost = new this.postModel(createPostInput);
    return createdPost.save();
  }
}
