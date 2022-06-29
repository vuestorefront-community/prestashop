
import { cookieParser } from '../../helpers/cookieParser';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function loadAddresses(context, params) {
  const url = new URL(context.config.api.url + context.config.api.restPath + '/alladdresses');

  const { data, headers } = await context.client.get(url.href, {
    headers: {
      Cookie: params.psCookieKey + '=' + params.psCookieValue + ';',
      moquiSessionToken: params.moquiSessionToken
    }
  });
  const cookieObject = cookieParser(headers);
  return {data, cookieObject};
}
