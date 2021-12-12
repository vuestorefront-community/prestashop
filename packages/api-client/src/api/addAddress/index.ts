// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function addAddresses(context, params) {
  const { address } = params;
  const url = new URL('/rest/address', context.config.api.url);

  const { data } = await context.client.post(url.href, address, {
    headers: {
      Cookie: params.psCookieKey + '=' + params.psCookieValue + ';'
    }
  }
  );
  return data;
}
