import { cookieParser } from '../../helpers/cookieParser';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function getShippingMethods(context, params) {
  const url = new URL('/rest/carriers', context.config.api.url);

  const { data, headers } = await context.client.get(url.href, {
    headers: {
      Cookie: params.psCookieKey + '=' + params.psCookieValue + ';'
    }
  });
  const cookieObject = cookieParser(headers);
  return {data, cookieObject};
}
