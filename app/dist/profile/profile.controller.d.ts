import { ProfileService } from './profile.service';
import { ProfileQueryDto } from 'src/DTO/profileQuery.dto';
export declare class ProfileController {
    private readonly profileService;
    constructor(profileService: ProfileService);
    getProfile(profileQuery: ProfileQueryDto): Promise<any>;
    updateProfile(body: {
        baseurl: string;
        email: string;
    }): Promise<import("mongoose").Document<unknown, {}, import("../Schemas/user.schema").UserDocument> & import("../Schemas/user.schema").User & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
