import {cookieParser} from '../../helpers/cookieParser';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function register(context, params) {
  const url = new URL('/rest/register', context.config.api.url);
  const { email, password, firstName, lastName } = params;

  const { data, headers } = await context.client.post(url.href, {
    email: email,
    password: password,
    firstName: firstName,
    lastName: lastName
  });

  // to get the latest Auth cookie - normally there are two PrestaShop cookies
  const numberOfCookies = headers['set-cookie'].length;
  let cookieString = null;
  for (let i = 0; i < numberOfCookies; i++) {
    if (headers['set-cookie'][i].includes('PrestaShop')) {
      cookieString = headers['set-cookie'][i];
    }
  }

  const cookieObject = cookieParser(cookieString);

  return {data, cookieObject};
}