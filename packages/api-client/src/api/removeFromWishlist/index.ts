import {cookieParser} from '../../helpers/cookieParser';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function removeFromWishlist(context, params) {
  const {psCookieKey, psCookieValue, product} = params;
  const url = new URL(context.config.api.url + params.lang + '/rest/wishlist');
  url.searchParams.set('id_product', product.id);
  // url.searchParams.set('id_wishlist', < add wishlist id if it exists >);
  url.searchParams.set('action', 'deleteProductFromWishList');

  if (psCookieKey && psCookieValue) {
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
