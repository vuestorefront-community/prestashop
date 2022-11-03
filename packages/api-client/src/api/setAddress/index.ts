import { cookieParser } from '../../helpers/cookieParser';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function setAddress(context, params) {
  const { id } = params;
  // eslint-disable-next-line camelcase
  const body = { id_address: id };
  const url = new URL(context.config.api.url + params.lang + '/rest/setaddresscheckout');
  url.searchParams.set('iso_currency', params.currency);
  const { data, headers } = await context.client.post(url.href, body, {
    headers: {
      Cookie: params.psCookieKey + '=' + params.psCookieValue + ';'
    }
  }
  );
  const cookieObject = cookieParser(headers);
  return {data, cookieObject};
}
