// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function getReview(context, params) {
  const url = new URL(context.config.api.url + params.lang + '/rest/listcomments');
  url.searchParams.set('iso_currency', params.currency);
  params.productId && url.searchParams.set('id_product', params.productId);
  params.page && url.searchParams.set('page', params.page);

  const { data } = await context.client.get(url.href);
  return data;
}
