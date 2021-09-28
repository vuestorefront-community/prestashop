import {cookieParser} from '../../helpers/cookieParser';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function login(context, params) {
  const url = new URL('/rest/login', context.config.api.url);
  const { username, password } = params;

  const { data, headers } = await context.client.post(url.href, {
    email: username,
    password: password
  });

  const cookieObject = cookieParser(headers['set-cookie'][0]);

  return {data, cookieObject};
}
