import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDoctorDto } from 'src/DTO/createDoctor.dto';
import { User, UserDocument } from 'src/Schemas/user.schema';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  // Create a new doctor
  async createDoctor(createDoctorDto: CreateDoctorDto): Promise<User> {
    const { firstName, lastName, email, password, phoneNumber, resume, speciality, imageUrl } = createDoctorDto;
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create a new doctor instance
    const newDoctor = new this.userModel({
      firstName,
      lastName,
      email,
      imageUrl,
      speciality,
      password: hashedPassword, 
      phoneNumber,
      resume,
      role: 'doctor',
    });

    // Save the doctor to the database
    return await newDoctor.save();
  }
}
