export declare class CreatePatientDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    role: string;
    medicalHistory?: Array<Buffer>;
    speciality: string;
}
