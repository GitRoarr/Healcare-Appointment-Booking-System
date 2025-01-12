import { AppointmentService } from './appointment.service';
import { AppointmentDto } from 'src/DTO/makeAppointment.dto';
export declare class AppointmentController {
    private readonly appointmentService;
    constructor(appointmentService: AppointmentService);
    MakeAnAppointment(appointmentdto: AppointmentDto): Promise<import("../Schemas/appointment.schema").Appointment | {
        messsage: string;
    }>;
    getAllAppointments(): Promise<(import("mongoose").Document<unknown, {}, import("../Schemas/appointment.schema").AppointmentDocument> & import("../Schemas/appointment.schema").Appointment & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getMyAppointments(patientName: string): Promise<(import("mongoose").Document<unknown, {}, import("../Schemas/appointment.schema").AppointmentDocument> & import("../Schemas/appointment.schema").Appointment & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getDoctorSchedule(doctorName: string): Promise<(import("mongoose").Document<unknown, {}, import("../Schemas/appointment.schema").AppointmentDocument> & import("../Schemas/appointment.schema").Appointment & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    deleteAppointment(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
