import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/Schemas/user.schema';
import { AdminController } from './admin.controller';

@Module({
   imports:[
            MongooseModule.forFeature([{
                name: User.name,
    
                schema: UserSchema
            }] )],
  providers: [AdminService],
  controllers:[AdminController]
  

})
export class AdminModule {
  
}
