
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function getPaymentMethods(context, params) {
  const url = new URL(context.config.api.url + params.lang + '/rest/paymentoptions');
  url.searchParams.set('iso_currency', params.currency);
  const { data } = await context.client.get(url.href, {
    headers: {
      Cookie: params.psCookieKey + '=' + params.psCookieValue + ';'
    }
  });

  return {data};
}
