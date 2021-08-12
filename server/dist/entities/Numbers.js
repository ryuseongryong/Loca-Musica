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
exports.Numbers = void 0;
const typeorm_1 = require("typeorm");
const Musicals_1 = require("./Musicals");
const UserNumber_1 = require("./UserNumber");
let Numbers = class Numbers {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ type: "int", name: "id" }),
    __metadata("design:type", Number)
], Numbers.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("int", { name: "musical_id" }),
    __metadata("design:type", Number)
], Numbers.prototype, "musicalId", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "title", nullable: true, length: 255 }),
    __metadata("design:type", String)
], Numbers.prototype, "title", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "url", length: 255 }),
    __metadata("design:type", String)
], Numbers.prototype, "url", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Musicals_1.Musicals, (musicals) => musicals.numbers, {
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION",
    }),
    typeorm_1.JoinColumn([{ name: "musical_id", referencedColumnName: "id" }]),
    __metadata("design:type", Musicals_1.Musicals)
], Numbers.prototype, "musical", void 0);
__decorate([
    typeorm_1.OneToMany(() => UserNumber_1.UserNumber, (userNumber) => userNumber.number),
    __metadata("design:type", Array)
], Numbers.prototype, "userNumbers", void 0);
Numbers = __decorate([
    typeorm_1.Index("musical_id", ["musicalId"], {}),
    typeorm_1.Entity("numbers", { schema: "test" })
], Numbers);
exports.Numbers = Numbers;
//# sourceMappingURL=Numbers.js.map