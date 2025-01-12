import { Body, Controller, Post } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('')
export class AdminController {
    constructor(private readonly adminService: AdminService, 
        
    ){}

    @Post('/add-doctor')
    async createDoctor(@Body() createDoctorDto) {
        this.adminService.createDoctor(createDoctorDto)
    }
}
