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

  const cookieObject = cookieParser(headers);

  return {data, cookieObject};
}
