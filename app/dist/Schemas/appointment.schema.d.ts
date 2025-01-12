import { Document } from 'mongoose';
export type AppointmentDocument = Appointment & Document;
export declare class Appointment {
    doctorName: string;
    patientName: string;
    date: Date;
    time: string;
    phoneNumber: string;
    email: string;
}
export declare const AppointmentSchema: import("mongoose").Schema<Appointment, import("mongoose").Model<Appointment, any, any, any, Document<unknown, any, Appointment> & Appointment & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Appointment, Document<unknown, {}, import("mongoose").FlatRecord<Appointment>> & import("mongoose").FlatRecord<Appointment> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
