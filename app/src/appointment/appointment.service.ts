import { Injectable } from '@nestjs/common';
import { Appointment, AppointmentDocument, AppointmentSchema } from 'src/Schemas/appointment.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AppointmentDto } from 'src/DTO/makeAppointment.dto';

@Injectable()
export class AppointmentService {
    constructor(@InjectModel(Appointment.name) private readonly appointmentModel: Model<AppointmentDocument>) {}
    async makeAnAppointment(appointmentdto: AppointmentDto): Promise<Appointment | {messsage: string}>{
        const appointment = await this.appointmentModel.create(appointmentdto)
        await appointment.save()
        return appointment


        
        
    }
    async getAllAppointments(){
        return await this.appointmentModel.find().exec()
    }
    async getAppointment(email: string) {
        return await this.appointmentModel.find({email: email}).exec()
    }
    async getAppointmentDoctor(doctorName:string){
        return await this.appointmentModel.find({doctorName: doctorName}).exec()
    }
    async deleteAppointment(id: string): Promise<{ success: boolean; message: string }> {
        try {
            const result = await this.appointmentModel.findByIdAndDelete(id);
            if (!result) {
                return { success: false, message: 'Appointment not found' };
            }
            return { success: true, message: 'Appointment deleted successfully' };
        } catch (error) {
            throw new Error(`Error deleting appointment: ${error.message}`);
        }
    }
    
}
