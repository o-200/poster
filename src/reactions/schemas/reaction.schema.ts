import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Post } from 'src/posts/schemas/post.schema';
import { User } from 'src/users/schemas/user.schema';

@Schema()
export class Reaction extends Document {
  @Prop({
    type: String,
    required: true,
    enum: ['LIKE', 'UPVOTE'],
  })
  type: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: String, ref: 'User', required: true })
  user: User;

  @Prop({ type: String, ref: 'Post', required: true })
  post: Post;
}
export const ReactionSchema = SchemaFactory.createForClass(Reaction);
