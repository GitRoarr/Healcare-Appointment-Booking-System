import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join, resolve } from 'path';
import { DashboardController } from './dashboard.controller';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { DoctorModule } from './doctor/doctor.module';

import { AdminModule } from './admin/admin.module';
import { AppointmentModule } from 'appointment/appointment.module';




@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/FetanCare', {
      autoIndex: true,
    }),
    
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..','..', '..', 'Dashboard'),
     
      
      serveRoot: '/Dashboard', 
    }), AuthModule, ProfileModule, DoctorModule, AdminModule, AppointmentModule
  ],
  controllers: [DashboardController],
  providers: [],
})
export class AppModule {}
