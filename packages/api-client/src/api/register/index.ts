import {cookieParser} from '../../helpers/cookieParser';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function register(context, params) {
  const url = new URL(context.config.api.url + params.lang + '/rest/register');
  url.searchParams.set('iso_currency', params.currency);
  const { email, password, firstName, lastName, psCookieKey, psCookieValue } = params;

  const { data, headers } = await context.client.post(url.href, {
    email: email,
    password: password,
    firstName: firstName,
    lastName: lastName
  }, {
    headers: {
      Cookie: psCookieKey + '=' + psCookieValue + ';'
    }
  });

  const cookieObject = cookieParser(headers);

  return {data, cookieObject};
}
