import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';

@Controller()
export class DashboardController {
  @Get('admin')
  getAdminAppointment(@Res() res: Response) {
    return res.sendFile(join(__dirname, '..', '..',  'Dashboard', 'Admin Dashboard', 'appointment', 'appointment.html'));
  }
  @Get('admin/add-doctor')
  AddDoctor(@Res() res: Response) {
    return res.sendFile(join(__dirname, '..', '..', 'Dashboard', 'Admin Dashboard', 'add-doctor', 'adddoctor.html'));

  }


  @Get('patient/schedule')
  getPatientSchedule(@Res() res: Response) {
    return res.sendFile(join(__dirname, '..', '..', 'Dashboard', 'Patient Dashboard', 'schedule.html'));
  }

  @Get('doctor/dashboard')
  getDoctorDashboard(@Res() res: Response) {
    return res.sendFile(join(__dirname, '..', '..', 'Dashboard', 'Doctor Dashboard', 'doctor.html'));
  }
  @Get('home')
  getHome(@Res() res: Response) {
    return res.sendFile(join(__dirname, '..', '..',  'Home_page', 'index.html'));
  }
  @Get('patient/doctor')
  getDoctorList(@Res() res: Response) {
    return res.sendFile(join(__dirname, '..', '..',  'Dashboard', 'Patient Dashboard', 'doctors.html'));
  }
  @Get('/service')
  getOutService(@Res() res: Response) {
    return res.sendFile(join(__dirname, '..', '..', 'Our service', 'service.html'));
  }
  @Get('contact')
  getContact(@Res() res: Response) {
    return res.sendFile(join(__dirname, '..', '..',  'Contact', 'contact.html'));
  }

}
