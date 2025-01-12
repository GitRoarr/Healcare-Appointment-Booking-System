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
exports.AppointmentService = void 0;
const common_1 = require("@nestjs/common");
const appointment_schema_1 = require("../Schemas/appointment.schema");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let AppointmentService = class AppointmentService {
    constructor(appointmentModel) {
        this.appointmentModel = appointmentModel;
    }
    async makeAnAppointment(appointmentdto) {
        const appointment = await this.appointmentModel.create(appointmentdto);
        await appointment.save();
        return appointment;
    }
    async getAllAppointments() {
        return await this.appointmentModel.find().exec();
    }
    async getAppointment(email) {
        return await this.appointmentModel.find({ email: email }).exec();
    }
    async getAppointmentDoctor(doctorName) {
        return await this.appointmentModel.find({ doctorName: doctorName }).exec();
    }
    async deleteAppointment(id) {
        try {
            const result = await this.appointmentModel.findByIdAndDelete(id);
            if (!result) {
                return { success: false, message: 'Appointment not found' };
            }
            return { success: true, message: 'Appointment deleted successfully' };
        }
        catch (error) {
            throw new Error(`Error deleting appointment: ${error.message}`);
        }
    }
};
exports.AppointmentService = AppointmentService;
exports.AppointmentService = AppointmentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(appointment_schema_1.Appointment.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AppointmentService);
//# sourceMappingURL=appointment.service.js.map