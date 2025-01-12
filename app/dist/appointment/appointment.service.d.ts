import { Appointment, AppointmentDocument } from 'src/Schemas/appointment.schema';
import { Model } from 'mongoose';
import { AppointmentDto } from 'src/DTO/makeAppointment.dto';
export declare class AppointmentService {
    private readonly appointmentModel;
    constructor(appointmentModel: Model<AppointmentDocument>);
    makeAnAppointment(appointmentdto: AppointmentDto): Promise<Appointment | {
        messsage: string;
    }>;
    getAllAppointments(): Promise<(import("mongoose").Document<unknown, {}, AppointmentDocument> & Appointment & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getAppointment(email: string): Promise<(import("mongoose").Document<unknown, {}, AppointmentDocument> & Appointment & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getAppointmentDoctor(doctorName: string): Promise<(import("mongoose").Document<unknown, {}, AppointmentDocument> & Appointment & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    deleteAppointment(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
