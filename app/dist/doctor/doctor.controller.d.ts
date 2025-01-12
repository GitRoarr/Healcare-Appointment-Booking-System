import { DoctorService } from './doctor.service';
export declare class DoctorController {
    private readonly doctorService;
    constructor(doctorService: DoctorService);
    getDoctor(): Promise<(import("mongoose").Document<unknown, {}, import("../Schemas/user.schema").UserDocument> & import("../Schemas/user.schema").User & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getDoctorByName(name: string): Promise<import("mongoose").Document<unknown, {}, import("../Schemas/user.schema").UserDocument> & import("../Schemas/user.schema").User & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getDoctorByEmail(email: string): Promise<import("mongoose").Document<unknown, {}, import("../Schemas/user.schema").UserDocument> & import("../Schemas/user.schema").User & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
