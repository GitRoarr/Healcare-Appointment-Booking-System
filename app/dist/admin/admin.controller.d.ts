import { AdminService } from './admin.service';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    createDoctor(createDoctorDto: any): Promise<void>;
}
