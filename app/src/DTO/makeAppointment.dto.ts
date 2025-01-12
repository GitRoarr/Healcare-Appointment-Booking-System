import {IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";


export class AppointmentDto {
    @IsString()
    @IsNotEmpty()

    patientName:string;

    @IsString()
    @IsNotEmpty()

    doctorName:string;
    
    @IsPhoneNumber('ET', {message:"We only work in Ethiopia"})
    phoneNumber:string;

    @IsNotEmpty()
    date: Date;

  
    @IsNotEmpty()
    time: Date;




}