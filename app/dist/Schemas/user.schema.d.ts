import { Document } from 'mongoose';
export type UserDocument = User & Document;
export declare class User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
    phoneNumber: string;
    speciality: string;
    imageUrl?: string;
    dateOfBirth?: Date;
    medicalHistory?: Array<Buffer>;
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, Document<unknown, any, User> & User & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, Document<unknown, {}, import("mongoose").FlatRecord<User>> & import("mongoose").FlatRecord<User> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
