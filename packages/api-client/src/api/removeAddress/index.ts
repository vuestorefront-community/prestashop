
import { cookieParser } from '../../helpers/cookieParser';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function removeAddress(context, params) {
  const { id } = params;
  // eslint-disable-next-line camelcase
  const body = { id_address: id };
  const url = new URL('/rest/address', context.config.api.url);
  const { data, headers } = await context.client.delete(url.href, body, {
    headers: {
      Cookie: params.psCookieKey + '=' + params.psCookieValue + ';'
    }
  }
  );

  const cookieObject = cookieParser(headers);

  console.log(data);
  return {data, cookieObject};
}
