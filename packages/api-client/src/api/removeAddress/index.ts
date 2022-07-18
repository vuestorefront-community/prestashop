
import { cookieParser } from '../../helpers/cookieParser';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function removeAddress(context, params) {
  const { id } = params;

  const url = new URL(context.config.api.url + context.config.api.restPath + '/address');
  // eslint-disable-next-line camelcase
  const { data, headers } = await context.client.delete(url.href, {
    headers: {
      Cookie: params.psCookieKey + '=' + params.psCookieValue + ';',
      moquiSessionToken: params.moquiSessionToken

    }, // eslint-disable-next-line camelcase
    data: { id_address: id }
  }
  );

  const cookieObject = cookieParser(headers);
  return {data, cookieObject};
}
