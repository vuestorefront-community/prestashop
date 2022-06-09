import { cookieParser } from '../../helpers/cookieParser';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function getAvailableCountries(context) {

  const url = new URL(context.config.api.url + context.config.api.restPath + '/addressform');

  const { data, headers } = await context.client.get(url.href);
  const cookieObject = cookieParser(headers);

  return {data, cookieObject};

}
