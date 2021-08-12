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
exports.Hashtags = void 0;
const typeorm_1 = require("typeorm");
const MusicalHashtag_1 = require("./MusicalHashtag");
const UserHashtag_1 = require("./UserHashtag");
let Hashtags = class Hashtags {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ type: "int", name: "id" }),
    __metadata("design:type", Number)
], Hashtags.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "name", unique: true, length: 255 }),
    __metadata("design:type", String)
], Hashtags.prototype, "name", void 0);
__decorate([
    typeorm_1.Column("int", { name: "tagcount", nullable: true, default: () => "'1'" }),
    __metadata("design:type", Number)
], Hashtags.prototype, "tagcount", void 0);
__decorate([
    typeorm_1.OneToMany(() => MusicalHashtag_1.MusicalHashtag, (musicalHashtag) => musicalHashtag.hashtag),
    __metadata("design:type", Array)
], Hashtags.prototype, "musicalHashtags", void 0);
__decorate([
    typeorm_1.OneToMany(() => UserHashtag_1.UserHashtag, (userHashtag) => userHashtag.hashtag),
    __metadata("design:type", Array)
], Hashtags.prototype, "userHashtags", void 0);
Hashtags = __decorate([
    typeorm_1.Index("name", ["name"], { unique: true }),
    typeorm_1.Entity("hashtags", { schema: "test" })
], Hashtags);
exports.Hashtags = Hashtags;
//# sourceMappingURL=Hashtags.js.map