import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePatientDto } from 'src/DTO/createPatient.dto';
import { User, UserDocument } from 'src/Schemas/user.schema';
import * as bcrypt from 'bcrypt'; 
import { LoginDto } from 'src/DTO/login.dto'
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
        private readonly jwtService: JwtService,
    ) {}

    async createUser(createPatientDto: CreatePatientDto): Promise<UserDocument> {
        const { password, email, firstName, lastName, medicalHistory, phoneNumber } = createPatientDto;
        const existingUser = await this.userModel.findOne({ email }).exec();
        if (existingUser) {
            throw new ConflictException('Email is already in use');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new this.userModel({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role: 'patient', 
            phoneNumber,
            medicalHistory,
        });
        return user.save();
    }
    async login(loginPatientDto: LoginDto) {
        const { email, password } = loginPatientDto;
    
      
        const user = await this.userModel.findOne({ email }).exec();
        if (!user) {
          throw new UnauthorizedException('Invalid email or password');
        }
    
        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          throw new UnauthorizedException('Invalid email or password');
        }
    
        const payload = { email: email, role: user.role }; 
        return {
          role: user.role,
          email: user.email,
          token: this.jwtService.sign(payload),
        
        
      }}
     
}
