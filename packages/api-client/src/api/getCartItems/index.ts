import {cookieParser} from '../../helpers/cookieParser';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function getCartItems(context, params) {
  const {psCookieKey, psCookieValue} = params;
  const url = new URL('/rest/cartitems', context.config.api.url);

  url.searchParams.set('image_size', 'small_default');

  if (psCookieKey && psCookieValue) {
    const { data, headers } = await context.client.get(url.href, {
      headers: {
        Cookie: psCookieKey + '=' + psCookieValue + ';'
      }
    });

    const cookieObject = cookieParser(headers);

    return {data, cookieObject};
  } else {
    const { data, headers } = await context.client.get(url.href);

    const cookieObject = cookieParser(headers);

    return {data, cookieObject};
  }
}
