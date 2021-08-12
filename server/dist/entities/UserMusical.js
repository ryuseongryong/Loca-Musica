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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMusical = void 0;
const typeorm_1 = require("typeorm");
const Users_1 = require("./Users");
const Musicals_1 = require("./Musicals");
let UserMusical = class UserMusical {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ type: "int", name: "id" }),
    __metadata("design:type", Number)
], UserMusical.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("int", { name: "user_id" }),
    __metadata("design:type", Number)
], UserMusical.prototype, "userId", void 0);
__decorate([
    typeorm_1.Column("int", { name: "musical_id" }),
    __metadata("design:type", Number)
], UserMusical.prototype, "musicalId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Users_1.Users, (users) => users.userMusicals, {
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION",
    }),
    typeorm_1.JoinColumn([{ name: "user_id", referencedColumnName: "id" }]),
    __metadata("design:type", Users_1.Users)
], UserMusical.prototype, "user", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Musicals_1.Musicals, (musicals) => musicals.userMusicals, {
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION",
    }),
    typeorm_1.JoinColumn([{ name: "musical_id", referencedColumnName: "id" }]),
    __metadata("design:type", Musicals_1.Musicals)
], UserMusical.prototype, "musical", void 0);
UserMusical = __decorate([
    typeorm_1.Index("bookmark", ["userId", "musicalId"], { unique: true }),
    typeorm_1.Index("musical_id", ["musicalId"], {}),
    typeorm_1.Entity("user_musical", { schema: "test" })
], UserMusical);
exports.UserMusical = UserMusical;
//# sourceMappingURL=UserMusical.js.map