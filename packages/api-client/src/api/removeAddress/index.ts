
import { cookieParser } from '../../helpers/cookieParser';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function removeAddress(context, params) {
  const { id } = params;
  const url = new URL(context.config.api.url + params.lang + '/rest/address');
  url.searchParams.set('iso_currency', params.currency);
  // eslint-disable-next-line camelcase
  const { data, headers } = await context.client.delete(url.href, {
    headers: {
      Cookie: params.psCookieKey + '=' + params.psCookieValue + ';'
    }, // eslint-disable-next-line camelcase
    data: { id_address: id }
  }
  );

  const cookieObject = cookieParser(headers);
  return {data, cookieObject};
}
