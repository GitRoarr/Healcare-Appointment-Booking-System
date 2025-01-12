import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    createUser(createPatientDto: any): Promise<void>;
    loginUser(logindto: any): Promise<{
        role: string;
        email: string;
        token: string;
    }>;
}
