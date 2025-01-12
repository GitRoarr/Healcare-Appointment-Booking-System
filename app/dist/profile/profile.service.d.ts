import { Model } from 'mongoose';
import { ProfileQueryDto } from 'src/DTO/profileQuery.dto';
import { User, UserDocument } from 'src/Schemas/user.schema';
export declare class ProfileService {
    private readonly userModel;
    constructor(userModel: Model<UserDocument>);
    getProfile(profileQuery: ProfileQueryDto): Promise<any>;
    updateProfile(baseurl: string, email: string): Promise<import("mongoose").Document<unknown, {}, UserDocument> & User & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
