import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Group, GroupSchema } from './schemas/group.schema';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { KidService } from 'src/kid/kid.service';
import { Kid, KidSchema } from 'src/kid/schemas/kid.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Group.name, schema: GroupSchema },
      { name: Kid.name, schema: KidSchema },
    ]),
  ],
  providers: [GroupService, KidService],
  controllers: [GroupController],
})
export class GroupModule {}
