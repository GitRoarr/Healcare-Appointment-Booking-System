import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';

import { DoctorController } from './doctor.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/Schemas/user.schema';

@Module({
  imports:[
          MongooseModule.forFeature([{
              name: User.name,
  
              schema: UserSchema
          }] )],
  providers: [DoctorService],
  controllers: [DoctorController]
})
export class DoctorModule {
  
}
