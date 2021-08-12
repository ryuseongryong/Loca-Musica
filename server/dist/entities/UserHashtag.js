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
exports.UserHashtag = void 0;
const typeorm_1 = require("typeorm");
const Users_1 = require("./Users");
const Hashtags_1 = require("./Hashtags");
let UserHashtag = class UserHashtag {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ type: "int", name: "id" }),
    __metadata("design:type", Number)
], UserHashtag.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("int", { name: "user_id" }),
    __metadata("design:type", Number)
], UserHashtag.prototype, "userId", void 0);
__decorate([
    typeorm_1.Column("int", { name: "hashtag_id" }),
    __metadata("design:type", Number)
], UserHashtag.prototype, "hashtagId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Users_1.Users, (users) => users.userHashtags, {
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION",
    }),
    typeorm_1.JoinColumn([{ name: "user_id", referencedColumnName: "id" }]),
    __metadata("design:type", Users_1.Users)
], UserHashtag.prototype, "user", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Hashtags_1.Hashtags, (hashtags) => hashtags.userHashtags, {
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION",
    }),
    typeorm_1.JoinColumn([{ name: "hashtag_id", referencedColumnName: "id" }]),
    __metadata("design:type", Hashtags_1.Hashtags)
], UserHashtag.prototype, "hashtag", void 0);
UserHashtag = __decorate([
    typeorm_1.Index("userHashtag", ["userId", "hashtagId"], { unique: true }),
    typeorm_1.Index("hashtag_id", ["hashtagId"], {}),
    typeorm_1.Entity("user_hashtag", { schema: "test" })
], UserHashtag);
exports.UserHashtag = UserHashtag;
//# sourceMappingURL=UserHashtag.js.map