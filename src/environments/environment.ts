// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  apiBaseHr_staging: 'http://apihr-staging.hrinteractive.co',
  apiBaseHr_production: 'https://apihr.hrinteractive.co',
  apiBaseHr_development: 'http://apihr-development.hrinteractive.co',
};

export const baseUrl = () => {
  const url = window.location.href;
  let ambient: string;

  if (url.split('localhost').length === 1) {
    if (url.split('-').length > 1) {
      ambient = url.split('-')[0].split('/')[url.split('-')[0].split('/').length - 1];
    }
  } else {
    ambient = 'development';
  }
  let urlApi = '';

  switch (ambient) {
    case 'development':
      urlApi = environment.apiBaseHr_development;
      break;
    case 'dev':
      urlApi = environment.apiBaseHr_development;
      break;
    case 'staging':
      urlApi = environment.apiBaseHr_staging;
      break;
    case 'demo':
      urlApi = environment.apiBaseHr_staging;
      break;

    default:
      urlApi = environment.apiBaseHr_production;
      break;
  }

  return urlApi;
};
