import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Comment } from './schemas/comment.schema';
import { CreateCommentInput } from './dto/create-comment.input';
import { Post } from 'src/posts/schemas/post.schema';
import { User } from 'src/users/schemas/user.schema';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
    @InjectModel(Post.name) private postModel: Model<Post>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async findAll(): Promise<Comment[]> {
    return this.commentModel.find().exec();
  }

  async create(input: CreateCommentInput): Promise<Comment> {
    const { authorId, postId, content } = input;

    if (!Types.ObjectId.isValid(authorId)) {
      throw new BadRequestException('Invalid authorId');
    }

    if (!Types.ObjectId.isValid(postId)) {
      throw new BadRequestException('Invalid postId');
    }

    const userExists = await this.userModel.exists({ _id: authorId });
    if (!userExists) throw new NotFoundException('User not found');

    const postExists = await this.postModel.exists({ _id: postId });
    if (!postExists) throw new NotFoundException('User not found');

    const comment = await this.commentModel.create({
      content,
      author: authorId,
      post: postId
    });

    await comment.populate([
      { path: 'author' },
      { path: 'post' }
    ])
    return comment;
  }
}
