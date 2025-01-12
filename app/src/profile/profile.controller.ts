import { Controller, Get, Query, NotFoundException, Patch, Body, HttpException, HttpStatus } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { LoginDto } from 'src/DTO/login.dto';  // Adjust path if needed
import { ProfileQueryDto } from 'src/DTO/profileQuery.dto';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  async getProfile(@Query() profileQuery: ProfileQueryDto) {
    try {
      
       const user = await this.profileService.getProfile(profileQuery);
       return user
     
    } catch (error) {
      // Optionally handle errors (e.g., user not found)
      throw new NotFoundException(error.message);
    }

  }
  @Patch('update-profile') // Route: PATCH /update-profile
async updateProfile(@Body() body: { baseurl: string; email: string }) {
 
        const { baseurl, email } = body;

       return await this.profileService.updateProfile(baseurl, email);

}
   
}
