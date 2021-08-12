"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_module_1 = require("./user/user.module");
const musical_module_1 = require("./musical/musical.module");
const search_module_1 = require("./search/search.module");
const admin_module_1 = require("./admin/admin.module");
const oauth_module_1 = require("./oauth/oauth.module");
const typeorm_1 = require("@nestjs/typeorm");
const Users_1 = require("./entities/Users");
const Musicals_1 = require("./entities/Musicals");
const Hashtags_1 = require("./entities/Hashtags");
const Numbers_1 = require("./entities/Numbers");
const UserMusical_1 = require("./entities/UserMusical");
const UserHashtag_1 = require("./entities/UserHashtag");
const UserNumber_1 = require("./entities/UserNumber");
const MusicalHashtag_1 = require("./entities/MusicalHashtag");
const auth_module_1 = require("./auth/auth.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            user_module_1.UserModule,
            musical_module_1.MusicalModule,
            search_module_1.SearchModule,
            admin_module_1.AdminModule,
            oauth_module_1.OauthModule,
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: 'loca-musica-db.ct0ktlt3mttk.ap-northeast-2.rds.amazonaws.com',
                port: 13306,
                username: 'admin',
                password: 'overture1234',
                database: 'test',
                entities: [
                    Users_1.Users,
                    Musicals_1.Musicals,
                    Hashtags_1.Hashtags,
                    Numbers_1.Numbers,
                    UserMusical_1.UserMusical,
                    UserHashtag_1.UserHashtag,
                    UserNumber_1.UserNumber,
                    MusicalHashtag_1.MusicalHashtag,
                ],
                charset: 'utf8mb4',
                synchronize: false,
                logging: true,
                keepConnectionAlive: true,
            }),
            auth_module_1.AuthModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map