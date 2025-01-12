import { Injectable, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/Schemas/user.schema';

@Injectable()
export class DoctorService {
constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
       
    ) {
        
    }
    async getDoctor() {
       const doctors = await this.userModel.find({role: 'doctor'}).exec()
       return doctors
  
    }
    async getDoctorByName(firstName: string) {
        if (!firstName) {
            throw new Error('Name query parameter is required');
        }
    
        // Use a case-insensitive regex to match the firstName
        const doctor = await this.userModel.findOne({
            firstName: { $regex: new RegExp(`^${firstName}$`, 'i') },
            //partial
            role: 'doctor'
        }).exec();
    
        console.log('Doctor found:', doctor);
        return doctor;
    }
    async getDoctorByEmail(email: string){
        const doctor = await this.userModel.findOne({ email: email });
        return doctor
    }
    
    

}


