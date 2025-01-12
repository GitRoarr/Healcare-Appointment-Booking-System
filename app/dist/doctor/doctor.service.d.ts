import { Model } from 'mongoose';
import { User, UserDocument } from 'src/Schemas/user.schema';
export declare class DoctorService {
    private readonly userModel;
    constructor(userModel: Model<UserDocument>);
    getDoctor(): Promise<(import("mongoose").Document<unknown, {}, UserDocument> & User & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getDoctorByName(firstName: string): Promise<import("mongoose").Document<unknown, {}, UserDocument> & User & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getDoctorByEmail(email: string): Promise<import("mongoose").Document<unknown, {}, UserDocument> & User & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
