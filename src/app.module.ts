import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { getBackendPrefix } from './helpers/url.helper';
import { SETTINGS } from './config/settings.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SectionDao } from './models/dao/section.dao';
import { GroupDao } from './models/dao/group.dao';
import { LinkDao } from './models/dao/link.dao';
import { BookmarkService } from './services/bookmark/bookmark.service';
import { WebController } from './controllers/web/web.controller';
import { SectionsController } from './controllers/sections/sections.controller';
import { GroupsController } from './controllers/groups/groups.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import {LinksController} from "./controllers/links/links.controller";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: SETTINGS.DATABASE.PATH,
      entities: [SectionDao, GroupDao, LinkDao],
      synchronize: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, SETTINGS.APPLICATION.WEB_APP_PATH),
    }),
  ],
  controllers: [
    AuthController,
    SectionsController,
    GroupsController,
    LinksController,
    WebController,
  ],
  providers: [AuthService, BookmarkService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        {
          method: RequestMethod.GET,
          path: `${getBackendPrefix()}/sections`,
        },
        {
          method: RequestMethod.POST,
          path: `${getBackendPrefix()}/auth`,
        },
      )
      .forRoutes('*api/*');
  }
}
