import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MusicalModule } from './musical/musical.module';
import { SearchModule } from './search/search.module';
import { AdminModule } from './admin/admin.module';
import { RouterModule } from '@nestjs/core';
import { OauthModule } from './oauth/oauth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/Users';
import { Musicals } from './entities/Musicals';
import { Hashtags } from './entities/Hashtags';
import { Numbers } from './entities/Numbers';
import { UserMusical } from './entities/UserMusical';
import { UserHashtag } from './entities/UserHashtag';
import { UserNumber } from './entities/UserNumber';
import { MusicalHashtag } from './entities/MusicalHashtag';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UserModule,
    MusicalModule,
    SearchModule,
    AdminModule,
    OauthModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      // 환경변수로 분리하기
      host: 'loca-musica-db.ct0ktlt3mttk.ap-northeast-2.rds.amazonaws.com',
      port: 13306,
      username: 'admin',
      password: 'overture1234',
      database: 'test',
      entities: [
        Users,
        Musicals,
        Hashtags,
        Numbers,
        UserMusical,
        UserHashtag,
        UserNumber,
        MusicalHashtag,
      ],
      charset: 'utf8mb4',
      synchronize: false, // DB Schema sync
      logging: true,
      keepConnectionAlive: true,
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
