import {Environment} from './environment.interface';

export const environment: Environment = {
  production: true,
  urls: {
    getSections: `api/sections`,
    postSection: 'api/sections'
  }
};
