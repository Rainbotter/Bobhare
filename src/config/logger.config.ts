import winston, {Logger} from "winston";
import {SETTINGS} from "./settings.config";

export class LoggerConfig {

    public static getLogger(className: string): Logger {

        return winston.createLogger(
            {
                format: winston.format.combine(
                    winston.format.errors({stack: true}),
                    winston.format.timestamp(),
                    winston.format.prettyPrint(),
                    winston.format.colorize(),
                    winston.format.label({label: className}),
                    winston.format.printf(({level, message, label, timestamp}) => {
                        return `[${timestamp}][${level}][${label}] ${message}`;
                    })),
                transports: [
                    new winston.transports.Console({level: SETTINGS.APPLICATION.LOG_LEVEL}),
                ],
            });
    }

}
