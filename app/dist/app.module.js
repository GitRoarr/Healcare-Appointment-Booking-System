"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const dashboard_controller_1 = require("./dashboard.controller");
const auth_module_1 = require("./auth/auth.module");
const profile_module_1 = require("./profile/profile.module");
const doctor_module_1 = require("./doctor/doctor.module");
const admin_module_1 = require("./admin/admin.module");
const appointment_module_1 = require("./appointment/appointment.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRoot('mongodb://localhost:27017/FetanCare', {
                autoIndex: true,
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', '..', 'Dashboard'),
                serveRoot: '/Dashboard',
            }), auth_module_1.AuthModule, profile_module_1.ProfileModule, doctor_module_1.DoctorModule, admin_module_1.AdminModule, appointment_module_1.AppointmentModule
        ],
        controllers: [dashboard_controller_1.DashboardController],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map