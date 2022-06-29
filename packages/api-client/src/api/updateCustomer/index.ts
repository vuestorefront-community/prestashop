
import { cookieParser } from '../../helpers/cookieParser';
import {logger} from '../../helpers/logging';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function updateCustomer(context, params) {
  const { updatedUserData } = params;
  const url = new URL(context.config.api.url + context.config.api.restPath + '/accountedit');

  logger.warn('customer psCookieKey ' + params.psCookieKey);
  logger.warn('customer psCookieValue ' + params.psCookieValue);

  const { data, headers } = await context.client.post(url.href, updatedUserData, {
    headers: {
      Cookie: params.psCookieKey + '=' + params.psCookieValue + ';',
      moquiSessionToken: params.moquiSessionToken
    }
  });
  const cookieObject = cookieParser(headers);
  return {data, cookieObject};
}
