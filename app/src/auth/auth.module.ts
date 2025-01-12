import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/Schemas/user.schema';
import { AuthController }  from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';


@Module({
    imports:[
        MongooseModule.forFeature([{
            name: User.name,

            schema: UserSchema
        }] ), JwtModule.register({
            secret: 'somekeywewillthinkaboutit', 
            signOptions: { expiresIn: '24h' },
          }),
    ],
    providers: [AuthService],
    controllers: [AuthController]
})
export class AuthModule {
    
}
