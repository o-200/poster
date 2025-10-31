import { Module } from '@nestjs/common';
import { ReactionsService } from './reactions.service';
import { ReactionsResolver } from './reactions.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Reaction } from './entities/reaction.entity';
import { ReactionSchema } from './schemas/reaction.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Reaction.name, schema: ReactionSchema },
    ]),
  ],
  providers: [ReactionsResolver, ReactionsService],
})
export class ReactionsModule {}
