
import { cookieParser } from '../../helpers/cookieParser';
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function fetchOrders(context, params) {
  const {psCookieKey, psCookieValue, orderId} = params;
  const url = new URL(context.config.api.url + params.lang + '/rest/orderhistory');
  url.searchParams.set('iso_currency', params.currency);
  if (orderId) {
    url.searchParams.set('id_order', orderId);
  }

  if (psCookieKey && psCookieValue) {
    // It's not possible to get cart items without cookies (or any operation on cart)
    const { data, headers } = await context.client.get(url.href, {
      headers: {
        Cookie: psCookieKey + '=' + psCookieValue + ';'
      }
    });

    const cookieObject = cookieParser(headers);

    return {data, cookieObject};
  } else return null;
}
