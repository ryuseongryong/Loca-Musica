"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MusicalModule = void 0;
const common_1 = require("@nestjs/common");
const musical_service_1 = require("./musical.service");
const musical_controller_1 = require("./musical.controller");
let MusicalModule = class MusicalModule {
};
MusicalModule = __decorate([
    common_1.Module({
        providers: [musical_service_1.MusicalService],
        controllers: [musical_controller_1.MusicalController]
    })
], MusicalModule);
exports.MusicalModule = MusicalModule;
//# sourceMappingURL=musical.module.js.map