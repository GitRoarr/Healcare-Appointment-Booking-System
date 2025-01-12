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
exports.DashboardController = void 0;
const common_1 = require("@nestjs/common");
const path_1 = require("path");
let DashboardController = class DashboardController {
    getAdminAppointment(res) {
        return res.sendFile((0, path_1.join)(__dirname, '..', '..', 'Dashboard', 'Admin Dashboard', 'appointment', 'appointment.html'));
    }
    AddDoctor(res) {
        return res.sendFile((0, path_1.join)(__dirname, '..', '..', 'Dashboard', 'Admin Dashboard', 'add-doctor', 'adddoctor.html'));
    }
    getPatientSchedule(res) {
        return res.sendFile((0, path_1.join)(__dirname, '..', '..', 'Dashboard', 'Patient Dashboard', 'schedule.html'));
    }
    getDoctorDashboard(res) {
        return res.sendFile((0, path_1.join)(__dirname, '..', '..', 'Dashboard', 'Doctor Dashboard', 'doctor.html'));
    }
    getHome(res) {
        return res.sendFile((0, path_1.join)(__dirname, '..', '..', 'Home_page', 'index.html'));
    }
    getDoctorList(res) {
        return res.sendFile((0, path_1.join)(__dirname, '..', '..', 'Dashboard', 'Patient Dashboard', 'doctors.html'));
    }
    getOutService(res) {
        return res.sendFile((0, path_1.join)(__dirname, '..', '..', 'Our service', 'service.html'));
    }
    getContact(res) {
        return res.sendFile((0, path_1.join)(__dirname, '..', '..', 'Contact', 'contact.html'));
    }
};
exports.DashboardController = DashboardController;
__decorate([
    (0, common_1.Get)('admin'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DashboardController.prototype, "getAdminAppointment", null);
__decorate([
    (0, common_1.Get)('admin/add-doctor'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DashboardController.prototype, "AddDoctor", null);
__decorate([
    (0, common_1.Get)('patient/schedule'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DashboardController.prototype, "getPatientSchedule", null);
__decorate([
    (0, common_1.Get)('doctor/dashboard'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DashboardController.prototype, "getDoctorDashboard", null);
__decorate([
    (0, common_1.Get)('home'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DashboardController.prototype, "getHome", null);
__decorate([
    (0, common_1.Get)('patient/doctor'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DashboardController.prototype, "getDoctorList", null);
__decorate([
    (0, common_1.Get)('/service'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DashboardController.prototype, "getOutService", null);
__decorate([
    (0, common_1.Get)('contact'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DashboardController.prototype, "getContact", null);
exports.DashboardController = DashboardController = __decorate([
    (0, common_1.Controller)()
], DashboardController);
//# sourceMappingURL=dashboard.controller.js.map