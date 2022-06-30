
import { cookieParser } from '../../helpers/cookieParser';
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function fetchOrders(context, params) {
  const {psCookieKey, psCookieValue, orderId, moquiSessionToken} = params;
  const url = new URL(context.config.api.url + context.config.api.restPath + '/orderhistory');

  if (orderId) {
    url.searchParams.set('id_order', orderId);
  }

  if (psCookieKey && psCookieValue) {
    // It's not possible to get cart items without cookies (or any operation on cart)
    const { data, headers } = await context.client.get(url.href, {
      headers: {
        Cookie: psCookieKey + '=' + psCookieValue + ';',
        moquiSessionToken: moquiSessionToken
      }
    });

    const cookieObject = cookieParser(headers);

    return {data, cookieObject};
  } else return null;
}
