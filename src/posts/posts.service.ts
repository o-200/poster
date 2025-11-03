import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Post } from './schemas/post.schema';
import { User } from 'src/users/schemas/user.schema';
import { CreatePostInput } from './dto/create-post.input';


@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<Post>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async findAll(): Promise<Post[]> {
    return this.postModel.find().exec();
  }

  async create(input: CreatePostInput): Promise<Post> {
    const { authorId, content } = input;

    if (!Types.ObjectId.isValid(authorId)) {
      throw new BadRequestException('Invalid authorId');
    }

    const exists = await this.userModel.exists({ _id: authorId });
    if (!exists) throw new NotFoundException('User not found');

    const post = await this.postModel.create({ content, author: authorId });

    await post.populate({ path: 'author' });
    return post;
  }
}
