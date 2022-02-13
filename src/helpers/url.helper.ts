import { SETTINGS } from '../config/settings.config';

export function getBackendPrefix(): string {
  return SETTINGS.APPLICATION.BACKEND_URL_PREFIX;
}
