import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AppointmentDocument = Appointment & Document;

@Schema()
export class Appointment {
    @Prop({ required: true })
    doctorName: string;

    @Prop({ required: true })
    patientName: string;

    @Prop({ required: true, type: Date })
    date: Date;

    @Prop({ required: true })
    time: string;

    @Prop({ required: true})
    phoneNumber: string;

    @Prop({ required: true})
    email: string;
    

}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
