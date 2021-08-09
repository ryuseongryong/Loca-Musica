import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MusicalModule } from './musical/musical.module';
import { SearchModule } from './search/search.module';
import { AdminModule } from './admin/admin.module';
import { RouterModule } from '@nestjs/core';
import { OauthModule } from './oauth/oauth.module';

@Module({
  imports: [UserModule, MusicalModule, SearchModule, AdminModule, OauthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
