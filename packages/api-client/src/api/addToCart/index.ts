import {cookieParser} from '../../helpers/cookieParser';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function addToCart(context, params) {
  const {psCookieKey, psCookieValue, product, quantity} = params;
  const url = new URL('/rest/addtocart', context.config.api.url);

  url.searchParams.set('product_id', product.id);
  url.searchParams.set('quantity', quantity);
  url.searchParams.set('image_size', 'medium_default');

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
