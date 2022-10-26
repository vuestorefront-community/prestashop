import { cookieParser } from '../../helpers/cookieParser';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function getCartItems(context, params) {
  const {psCookieKey, psCookieValue} = params;
  const url = new URL(context.config.api.url + params.lang + '/rest/cart');
  url.searchParams.set('iso_currency', params.currency);
  url.searchParams.set('image_size', 'medium_default');

  if (psCookieKey && psCookieValue) {
    // It's not possible to get cart items without cookies (or any operation on cart)
    const { data, headers } = await context.client.get(url.href, {
      headers: {
        Cookie: psCookieKey + '=' + psCookieValue + ';'
      }
    });

    const cookieObject = cookieParser(headers);
    return {data, cookieObject};
  } else {
    return {};
  }
}
