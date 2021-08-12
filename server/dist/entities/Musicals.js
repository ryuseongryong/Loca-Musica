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
exports.Musicals = void 0;
const typeorm_1 = require("typeorm");
const UserMusical_1 = require("./UserMusical");
const MusicalHashtag_1 = require("./MusicalHashtag");
const Numbers_1 = require("./Numbers");
let Musicals = class Musicals {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ type: "int", name: "id" }),
    __metadata("design:type", Number)
], Musicals.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "code", unique: true, length: 255 }),
    __metadata("design:type", String)
], Musicals.prototype, "code", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "title", length: 255 }),
    __metadata("design:type", String)
], Musicals.prototype, "title", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "thumbnail", nullable: true, length: 255 }),
    __metadata("design:type", String)
], Musicals.prototype, "thumbnail", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "contents", nullable: true, length: 255 }),
    __metadata("design:type", String)
], Musicals.prototype, "contents", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "state", nullable: true, length: 255 }),
    __metadata("design:type", String)
], Musicals.prototype, "state", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "actors", nullable: true, length: 255 }),
    __metadata("design:type", String)
], Musicals.prototype, "actors", void 0);
__decorate([
    typeorm_1.OneToMany(() => UserMusical_1.UserMusical, (userMusical) => userMusical.musical),
    __metadata("design:type", Array)
], Musicals.prototype, "userMusicals", void 0);
__decorate([
    typeorm_1.OneToMany(() => MusicalHashtag_1.MusicalHashtag, (musicalHashtag) => musicalHashtag.musical),
    __metadata("design:type", Array)
], Musicals.prototype, "musicalHashtags", void 0);
__decorate([
    typeorm_1.OneToMany(() => Numbers_1.Numbers, (numbers) => numbers.musical),
    __metadata("design:type", Array)
], Musicals.prototype, "numbers", void 0);
Musicals = __decorate([
    typeorm_1.Index("code", ["code"], { unique: true }),
    typeorm_1.Entity("musicals", { schema: "test" })
], Musicals);
exports.Musicals = Musicals;
//# sourceMappingURL=Musicals.js.map