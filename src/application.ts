import express from 'express';
import {Routes} from "./config/routes.config";
import {SETTINGS} from "./config/settings.config";
import {Logger} from "winston";
import {singleton} from "tsyringe";
import {LoggerConfig} from "./config/logger.config";
import {Middlewares} from "./config/middlewares.config";
import {DatabaseConfig} from "./config/database.config";

@singleton()
export class Application {

  private readonly app: express.Application = express();

  private logger: Logger = LoggerConfig.getLogger("Application");

  constructor(private routes: Routes,
              private middlewares: Middlewares,
              private databaseConfig: DatabaseConfig) {
    this.logger.info("App is starting");

    this.start()
      .then(() => {
        this.app.listen(parseInt(SETTINGS.APPLICATION.PORT, 10), '0.0.0.0');
        this.logger.info(`App is ready and listening on port ${SETTINGS.APPLICATION.PORT}`);
      })
      .catch(() => {
        this.logger.error("App failed to start. Will try to properly shutdown");
        this.stop()
          .then(() => this.logger.error("Shut down success"))
          .catch(() => this.logger.error("Failed to stop properly"))
          .finally(() => process.exit());
      });
  }

  private start(): Promise<void[]> {

    this.configureMiddlewares();
    this.logSettings();

    const toDoAsynchronouslyOnLaunch = [
      this.databaseConfig.connect(),
    ];

    return Promise.all(toDoAsynchronouslyOnLaunch);
  }

  private stop(): Promise<void[]> {
    const toDoAsynchronouslyOnStop = [
      this.databaseConfig.disconnect()
    ];

    return Promise.all(toDoAsynchronouslyOnStop);
  }

  private configureMiddlewares(): void {
    this.app.use(express.json({limit: '1mb'}));
    this.app.use(express.urlencoded({extended: false}));
    this.routes.setupRoutes(this.app);
    this.app.use(this.middlewares.handleUncaughtExceptions());
    this.app.use(this.middlewares.handleUnknownRoutes());
  }

  private logSettings(): void {
    this.logger.info(`Web app path : ${SETTINGS.APPLICATION.WEB_APP_PATH}`);
  }

}

