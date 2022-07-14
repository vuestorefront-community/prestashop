import {cookieParser} from '../../helpers/cookieParser';
import {logger} from '../../helpers/logging';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function register(context, params) {
  const url = new URL(context.config.api.url + context.config.api.restPath + '/register');
  const { email, password, firstName, lastName, psCookieKey, psCookieValue, moquiSessionToken } = params;

  logger.warn('register moquiSessionToken ' + moquiSessionToken);

  logger.warn('register psCookieKey ' + psCookieKey);
  logger.warn('register psCookieValue ' + psCookieValue);

  // logger.warn('register context.$prestashop.config.app');
  // logger.warn(                  context.$prestashop.config.app);

  const { data, headers } = await context.client.post(url.href, {
    email: email,
    password: password,
    firstName: firstName,
    lastName: lastName
  }, {
    headers: {
      Cookie: psCookieKey + '=' + psCookieValue + ';',
      moquiSessionToken: moquiSessionToken
    }
  });

  logger.info('register Data');
  logger.info(data);

  logger.info('register Headers');
  logger.info(headers);

  const cookieObject = cookieParser(headers);

  return {data, headers, cookieObject};
}
