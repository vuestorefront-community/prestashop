import {cookieParser} from '../../helpers/cookieParser';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function login(context, params) {
  const url = new URL(context.config.api.url + context.config.api.restPath + '/login');
  const { username, password, psCookieKey, psCookieValue, moquiSessionToken } = params;

  const { data, headers } = await context.client.post(url.href, {
    email: username,
    password: password
  }, {
    headers: {
      Cookie: psCookieKey + '=' + psCookieValue + ';',
      moquiSessionToken: moquiSessionToken
    }
  });

  const cookieObject = cookieParser(headers);

  return {data, cookieObject};
}
