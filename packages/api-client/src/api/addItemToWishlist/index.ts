import {cookieParser} from '../../helpers/cookieParser';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function addItemToWishlist(context, params) {
  const {psCookieKey, psCookieValue, product} = params;
  const url = new URL(context.config.api.url + params.lang + '/rest/wishlist');
  url.searchParams.set('action', 'addProductToWishlist');
  url.searchParams.set('id_product', product.id);

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