import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentDto } from 'src/DTO/makeAppointment.dto';

@Controller('appointment')
export class AppointmentController {
    constructor(private readonly appointmentService: AppointmentService){}

    @Post('/create')
    async MakeAnAppointment( @Body() appointmentdto:AppointmentDto){
        return await this.appointmentService.makeAnAppointment(appointmentdto)
    }
    @Get('/getAll')
    getAllAppointments(){
        return this.appointmentService.getAllAppointments()
    }
    @Get('/getMyAppointments')
    getMyAppointments(@Query('name') patientName: string){
        return this.appointmentService.getAppointment(patientName)
    }
   @Get('/getDoctorSchedule')
   getDoctorSchedule(@Query('name') doctorName: string){
       const sanitizedName = doctorName.replace(/"/g, '');
       return this.appointmentService.getAppointmentDoctor(sanitizedName)
   }
   @Delete('/delete')
async deleteAppointment(
    @Query('patientName') patientName: string,
    @Query('doctorName') doctorName: string,
) {
    return await this.appointmentService.deleteAppointmentByNames(patientName, doctorName);
}

}

