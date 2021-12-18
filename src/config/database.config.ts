import {singleton} from "tsyringe";
import {LoggerConfig} from "./logger.config";
import {Logger} from "winston";
import {SETTINGS} from "./settings.config";
import {createConnection, getConnection} from "typeorm";
import {SqliteConnectionOptions} from "typeorm/driver/sqlite/SqliteConnectionOptions";
import {Section} from "../models/dao/section.dao";
import {Group} from "../models/dao/group.dao";
import {Bookmark} from "../models/dao/bookmark.dao";


@singleton()
export class DatabaseConfig {

  private logger: Logger = LoggerConfig.getLogger("DatabaseConfig");

  public async connect(): Promise<void> {

    const defaultDatabaseOptions: SqliteConnectionOptions = {
      type: "sqlite",
      database: SETTINGS.DATABASE.PATH,
      synchronize: true,
      entities: [
        Section,
        Group,
        Bookmark
      ]
    };

    this.logger.info("Connecting to database at path " + SETTINGS.DATABASE.PATH);

    return createConnection(defaultDatabaseOptions)
      .then(value => {
        this.logger.info("Connected to Database");
      }).catch(reason => {
        this.logger.error("Connection to the Database failed : " + reason);
        throw reason;
      });
  }

  public async disconnect(): Promise<void> {
    this.logger.info("Close connection to database");
    return getConnection().close()
      .then(() => {
        this.logger.info("Database connection closed properly");
      })
      .catch(() => {
        this.logger.info("An error occurred while closing database connection");
      });
  }

}
