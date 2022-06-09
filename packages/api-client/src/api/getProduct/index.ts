// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function getProduct(context, params) {
  if (params.id) {
    const url = new URL(context.config.api.url + context.config.api.restPath + '/productdetail');
    params.id && url.searchParams.set('product_id', params.id);
    if (params.refresh) {
      params.refresh && url.searchParams.set('refresh', params.refresh);
      for (const i in params.variantObj) {
        url.searchParams.set(`group[${i}]`, params.variantObj[i]);
      }
    }
    const { data } = await context.client.get(url.href);
    return data;
  } else if (params.featured) {
    const url = new URL(context.config.api.url + context.config.api.restPath + '/featuredproducts');

    const { data } = await context.client.get(url.href);
    return data;
  }
}
