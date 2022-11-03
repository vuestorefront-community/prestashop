// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function loadCustomer(context, params) {
  const url = new URL(context.config.api.url + params.lang + '/rest/accountInfo');
  url.searchParams.set('iso_currency', params.currency);
  const { data } = await context.client.get(url.href, {
    headers: {
      Cookie: params.key + '=' + params.value + ';'
    }
  });

  return data;
}
