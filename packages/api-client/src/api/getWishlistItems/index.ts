import {cookieParser} from '../../helpers/cookieParser';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function getWishlistItems(context, params) {
  const {psCookieKey, psCookieValue} = params;
  const url = new URL(context.config.api.url + params.lang + '/rest/wishlist');
  // url.searchParams.set('id_wishlist', < add wishlist id if it exists >);
  url.searchParams.set('action', 'viewWishlist');

  if (psCookieKey && psCookieValue) {
    // It's not possible to get cart items without cookies (or any operation on cart)
    const {data, headers} = await context.client.get(url.href, {
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
