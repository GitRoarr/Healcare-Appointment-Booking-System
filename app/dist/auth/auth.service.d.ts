import { Model } from 'mongoose';
import { CreatePatientDto } from 'src/DTO/createPatient.dto';
import { UserDocument } from 'src/Schemas/user.schema';
import { LoginDto } from 'src/DTO/login.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly userModel;
    private readonly jwtService;
    constructor(userModel: Model<UserDocument>, jwtService: JwtService);
    createUser(createPatientDto: CreatePatientDto): Promise<UserDocument>;
    login(loginPatientDto: LoginDto): Promise<{
        role: string;
        email: string;
        token: string;
    }>;
}
