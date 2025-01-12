import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}
    @Post('register')
    async createUser(@Body() createPatientDto) {
        this.authService.createUser(createPatientDto)
    }
    @Post('login')
    async loginUser(@Body() logindto) {
       return await this.authService.login(logindto)
   
    }
   



}
