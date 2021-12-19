export interface Environment {
  production: boolean;
  urls: {
    getSections: string,
    postSection: string,
  };
}
