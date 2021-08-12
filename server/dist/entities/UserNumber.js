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
exports.UserNumber = void 0;
const typeorm_1 = require("typeorm");
const Users_1 = require("./Users");
const Numbers_1 = require("./Numbers");
let UserNumber = class UserNumber {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ type: "int", name: "id" }),
    __metadata("design:type", Number)
], UserNumber.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("int", { name: "user_id" }),
    __metadata("design:type", Number)
], UserNumber.prototype, "userId", void 0);
__decorate([
    typeorm_1.Column("int", { name: "number_id" }),
    __metadata("design:type", Number)
], UserNumber.prototype, "numberId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Users_1.Users, (users) => users.userNumbers, {
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION",
    }),
    typeorm_1.JoinColumn([{ name: "user_id", referencedColumnName: "id" }]),
    __metadata("design:type", Users_1.Users)
], UserNumber.prototype, "user", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Numbers_1.Numbers, (numbers) => numbers.userNumbers, {
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION",
    }),
    typeorm_1.JoinColumn([{ name: "number_id", referencedColumnName: "id" }]),
    __metadata("design:type", Numbers_1.Numbers)
], UserNumber.prototype, "number", void 0);
UserNumber = __decorate([
    typeorm_1.Index("userNumber", ["userId", "numberId"], { unique: true }),
    typeorm_1.Index("number_id", ["numberId"], {}),
    typeorm_1.Entity("user_number", { schema: "test" })
], UserNumber);
exports.UserNumber = UserNumber;
//# sourceMappingURL=UserNumber.js.map