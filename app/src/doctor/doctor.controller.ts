import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { DoctorService } from './doctor.service';

@Controller('doctor')
export class DoctorController {
    constructor(private readonly doctorService: DoctorService) {}

    @Get()
    async getDoctor() {
        return this.doctorService.getDoctor();
    }

    @Get('info')
    async getDoctorByName(@Query('name') name: string) {
        if (!name) {
            throw new BadRequestException('Name query parameter is required');
        }
        const sanitizedName = name.replace(/"/g, '');
        
        const doctor = await this.doctorService.getDoctorByName(sanitizedName);
        
        if (!doctor) {
            throw new BadRequestException('Doctor not found');
        }

        return doctor;
    }
    @Get('email')
    async getDoctorByEmail(@Query('email') email: string) {
        if (!email) {
            throw new BadRequestException('Name query parameter is required');
        }
        const sanitizedName = email.replace(/"/g, '');
        
        const doctor = await this.doctorService.getDoctorByEmail(sanitizedName);
        
        if (!doctor) {
            throw new BadRequestException('Doctor not found');
        }

        return doctor;
    }
}
