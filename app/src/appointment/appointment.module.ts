import { Module } from '@nestjs/common';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from './appointment.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AppointmentSchema, Appointment } from 'src/Schemas/appointment.schema';

@Module({
  imports:[MongooseModule.forFeature([{
    name: Appointment.name, 
    schema: AppointmentSchema


  }])],
  providers: [AppointmentService],
  controllers: [AppointmentController]
})
export class AppointmentModule {}
