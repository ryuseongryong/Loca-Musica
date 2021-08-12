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
exports.MusicalHashtag = void 0;
const typeorm_1 = require("typeorm");
const Hashtags_1 = require("./Hashtags");
const Musicals_1 = require("./Musicals");
let MusicalHashtag = class MusicalHashtag {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ type: "int", name: "id" }),
    __metadata("design:type", Number)
], MusicalHashtag.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("int", { name: "hashtag_id" }),
    __metadata("design:type", Number)
], MusicalHashtag.prototype, "hashtagId", void 0);
__decorate([
    typeorm_1.Column("int", { name: "musical_id" }),
    __metadata("design:type", Number)
], MusicalHashtag.prototype, "musicalId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Hashtags_1.Hashtags, (hashtags) => hashtags.musicalHashtags, {
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION",
    }),
    typeorm_1.JoinColumn([{ name: "hashtag_id", referencedColumnName: "id" }]),
    __metadata("design:type", Hashtags_1.Hashtags)
], MusicalHashtag.prototype, "hashtag", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Musicals_1.Musicals, (musicals) => musicals.musicalHashtags, {
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION",
    }),
    typeorm_1.JoinColumn([{ name: "musical_id", referencedColumnName: "id" }]),
    __metadata("design:type", Musicals_1.Musicals)
], MusicalHashtag.prototype, "musical", void 0);
MusicalHashtag = __decorate([
    typeorm_1.Index("musicalHashtag", ["hashtagId", "musicalId"], { unique: true }),
    typeorm_1.Index("musical_id", ["musicalId"], {}),
    typeorm_1.Entity("musical_hashtag", { schema: "test" })
], MusicalHashtag);
exports.MusicalHashtag = MusicalHashtag;
//# sourceMappingURL=MusicalHashtag.js.map