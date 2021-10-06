import {cookieParser} from '../../helpers/cookieParser';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function getCartItems(context, params) {
  const {psCookieKey, psCookieValue} = params;
  const url = new URL('/rest/cartitems', context.config.api.url);

  url.searchParams.set('image_size', 'medium_default');

  if (psCookieKey && psCookieValue) {
    const { data } = await context.client.get(url.href, {
      headers: {
        Cookie: psCookieKey + '=' + psCookieValue + ';'
      }
    });

    return {data};
  } else {
    const { data, headers } = await context.client.get(url.href);

    const cookieObject = cookieParser(headers);

    return {data, cookieObject};
  }
}
