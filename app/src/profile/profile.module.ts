import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { User, UserSchema } from 'src/Schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
    imports:[
          MongooseModule.forFeature([{
              name: User.name,
  
              schema: UserSchema
          }] )
      ],
  providers: [ProfileService],
  controllers: [ProfileController]
})
export class ProfileModule {}
