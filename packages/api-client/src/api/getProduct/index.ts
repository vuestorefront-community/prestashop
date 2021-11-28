// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function getProduct(context, params) {
  if (params.id) {
    const url = new URL('/rest/productdetail', context.config.api.url);

    params.id && url.searchParams.set('product_id', params.id);
    params.refresh && url.searchParams.set('refresh', params.refresh);
    params.group && url.searchParams.set(`group[${params.group}]`, params.attr);

    const { data } = await context.client.get(url.href);
    return data;
  } else if (params.featured) {
    const url = new URL('/rest/featuredproducts', context.config.api.url);

    const { data } = await context.client.get(url.href);
    return data;
  }
}
