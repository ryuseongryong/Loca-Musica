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
exports.Users = void 0;
const typeorm_1 = require("typeorm");
const UserMusical_1 = require("./UserMusical");
const UserHashtag_1 = require("./UserHashtag");
const UserNumber_1 = require("./UserNumber");
let Users = class Users {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ type: "int", name: "id" }),
    __metadata("design:type", Number)
], Users.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "username", length: 255 }),
    __metadata("design:type", String)
], Users.prototype, "username", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "email", unique: true, length: 255 }),
    __metadata("design:type", String)
], Users.prototype, "email", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "password", length: 255 }),
    __metadata("design:type", String)
], Users.prototype, "password", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "profile", nullable: true, length: 255 }),
    __metadata("design:type", String)
], Users.prototype, "profile", void 0);
__decorate([
    typeorm_1.Column("tinyint", { name: "resign", width: 1, default: () => "'0'" }),
    __metadata("design:type", Boolean)
], Users.prototype, "resign", void 0);
__decorate([
    typeorm_1.Column("tinyint", { name: "admin", width: 1, default: () => "'0'" }),
    __metadata("design:type", Boolean)
], Users.prototype, "admin", void 0);
__decorate([
    typeorm_1.Column("timestamp", {
        name: "created_at",
        nullable: true,
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], Users.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column("timestamp", {
        name: "updated_at",
        nullable: true,
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], Users.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.OneToMany(() => UserMusical_1.UserMusical, (userMusical) => userMusical.user),
    __metadata("design:type", Array)
], Users.prototype, "userMusicals", void 0);
__decorate([
    typeorm_1.OneToMany(() => UserHashtag_1.UserHashtag, (userHashtag) => userHashtag.user),
    __metadata("design:type", Array)
], Users.prototype, "userHashtags", void 0);
__decorate([
    typeorm_1.OneToMany(() => UserNumber_1.UserNumber, (userNumber) => userNumber.user),
    __metadata("design:type", Array)
], Users.prototype, "userNumbers", void 0);
Users = __decorate([
    typeorm_1.Index("email", ["email"], { unique: true }),
    typeorm_1.Entity("users", { schema: "test" })
], Users);
exports.Users = Users;
//# sourceMappingURL=Users.js.map