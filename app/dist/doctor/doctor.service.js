"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../Schemas/user.schema");
let DoctorService = class DoctorService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async getDoctor() {
        const doctors = await this.userModel.find({ role: 'doctor' }).exec();
        return doctors;
    }
    async getDoctorByName(firstName) {
        if (!firstName) {
            throw new Error('Name query parameter is required');
        }
        const doctor = await this.userModel.findOne({
            firstName: { $regex: new RegExp(`^${firstName}$`, 'i') },
            role: 'doctor'
        }).exec();
        console.log('Doctor found:', doctor);
        return doctor;
    }
    async getDoctorByEmail(email) {
        const doctor = await this.userModel.findOne({ email: email });
        return doctor;
    }
};
exports.DoctorService = DoctorService;
exports.DoctorService = DoctorService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], DoctorService);
//# sourceMappingURL=doctor.service.js.map