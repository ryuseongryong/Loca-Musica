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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchController = void 0;
const common_1 = require("@nestjs/common");
let SearchController = class SearchController {
    searchByMultipleHashtags(hashtag1, hashtag2, hashtag3) {
        return `this is result by ${hashtag1}&${hashtag2}&${hashtag3}`;
    }
    searchBySingleHashtag(hashtag) {
        return `this is result by ${hashtag}`;
    }
};
__decorate([
    common_1.Get(),
    __param(0, common_1.Query('hashtag1')),
    __param(1, common_1.Query('hashtag2')),
    __param(2, common_1.Query('hashtag3')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], SearchController.prototype, "searchByMultipleHashtags", null);
__decorate([
    common_1.Get(':hashtag'),
    __param(0, common_1.Param('hashtag')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SearchController.prototype, "searchBySingleHashtag", null);
SearchController = __decorate([
    common_1.Controller('search')
], SearchController);
exports.SearchController = SearchController;
//# sourceMappingURL=search.controller.js.map