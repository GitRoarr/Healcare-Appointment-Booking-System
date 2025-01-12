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
exports.DoctorController = void 0;
const common_1 = require("@nestjs/common");
const doctor_service_1 = require("./doctor.service");
let DoctorController = class DoctorController {
    constructor(doctorService) {
        this.doctorService = doctorService;
    }
    async getDoctor() {
        return this.doctorService.getDoctor();
    }
    async getDoctorByName(name) {
        if (!name) {
            throw new common_1.BadRequestException('Name query parameter is required');
        }
        const sanitizedName = name.replace(/"/g, '');
        const doctor = await this.doctorService.getDoctorByName(sanitizedName);
        if (!doctor) {
            throw new common_1.BadRequestException('Doctor not found');
        }
        return doctor;
    }
    async getDoctorByEmail(email) {
        if (!email) {
            throw new common_1.BadRequestException('Name query parameter is required');
        }
        const sanitizedName = email.replace(/"/g, '');
        const doctor = await this.doctorService.getDoctorByEmail(sanitizedName);
        if (!doctor) {
            throw new common_1.BadRequestException('Doctor not found');
        }
        return doctor;
    }
};
exports.DoctorController = DoctorController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "getDoctor", null);
__decorate([
    (0, common_1.Get)('info'),
    __param(0, (0, common_1.Query)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "getDoctorByName", null);
__decorate([
    (0, common_1.Get)('email'),
    __param(0, (0, common_1.Query)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DoctorController.prototype, "getDoctorByEmail", null);
exports.DoctorController = DoctorController = __decorate([
    (0, common_1.Controller)('doctor'),
    __metadata("design:paramtypes", [doctor_service_1.DoctorService])
], DoctorController);
//# sourceMappingURL=doctor.controller.js.map