import { Model } from 'mongoose';
import { CreateDoctorDto } from 'src/DTO/createDoctor.dto';
import { User, UserDocument } from 'src/Schemas/user.schema';
export declare class AdminService {
    private readonly userModel;
    constructor(userModel: Model<UserDocument>);
    createDoctor(createDoctorDto: CreateDoctorDto): Promise<User>;
}
