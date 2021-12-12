// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function loadAddresses(context, params) {
  const url = new URL('/rest/alladdresses', context.config.api.url);

  const { data } = await context.client.get(url.href, {
    headers: {
      Cookie: params.psCookieKey + '=' + params.psCookieValue + ';'
    }
  });
  return data;
}
