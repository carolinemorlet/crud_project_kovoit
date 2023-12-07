import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { KidModule } from './kid/kid.module';
import { RelationModule } from './relation/relation.module';
import { TokenModule } from './token/token.module';
import { AssociationModule } from './association/association.module';
import { EventModule } from './event/event.module';
import { GroupModule } from './group/group.module';
import { CarshareModule } from './carshare/carshare.module';
import { ParticipeModule } from './participe/participe.module';
import { EmailModule } from './email/email.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_DNS, {
      dbName: 'kovoit-team',
    }),
    UserModule,
    KidModule,
    RelationModule,
    TokenModule,
    AssociationModule,
    EventModule,
    GroupModule,
    CarshareModule,
    ParticipeModule,
    EmailModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
