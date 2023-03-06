import { cookieParser } from '../../helpers/cookieParser';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function getAvailableCountries(context, params) {

  const url = new URL(context.config.api.url + params.lang + '/rest/addressform');
  url.searchParams.set('iso_currency', params.currency);
  const { data, headers } = await context.client.get(url.href);
  const cookieObject = cookieParser(headers);

  return {data, cookieObject};
}
