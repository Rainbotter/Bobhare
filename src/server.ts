import "reflect-metadata";
import {Application} from "./application";
import {container} from "tsyringe";

container.resolve(Application);
