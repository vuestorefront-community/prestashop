import {cookieParser} from '../../helpers/cookieParser';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function addToCart(context, params) {
  const {psCookieKey, psCookieValue, product, quantity} = params;
  const url = new URL(context.config.api.url + params.lang + '/rest/cart');
  url.searchParams.set('iso_currency', params.currency);
  url.searchParams.set('id_product', product.id);
  url.searchParams.set('qty', quantity);
  url.searchParams.set('id_product_attribute', product.attributeId);
  url.searchParams.set('op', 'up');
  url.searchParams.set('update', '1');
  url.searchParams.set('action', 'update');
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
    return {};
  }
}
