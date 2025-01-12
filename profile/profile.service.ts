import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ProfileQueryDto } from 'src/DTO/profileQuery.dto';
import { User, UserDocument } from 'src/Schemas/user.schema';

@Injectable()
export class ProfileService 
{
     constructor(
             @InjectModel(User.name) private readonly userModel: Model<UserDocument>) {

         }
    async getProfile(profileQuery: ProfileQueryDto): Promise<any> {
      const { email } = profileQuery;
      return await this.userModel.findOne({ email }).exec();
     
      //since this is a protected route no need for check if user exist
    
    }
    async updateProfile(baseurl: string, email:string) {
       const user = await this.userModel.findOne({email:email}).exec();
       user.imageUrl = baseurl;
       return await user.save();


    }
  

}
