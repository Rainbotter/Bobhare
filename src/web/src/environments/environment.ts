import {Environment} from './environment.interface';

export const environment: Environment = {
  production: false,
  urls: {
    getSections: `api/sections`,
    postSection: 'api/sections'
  }
};
