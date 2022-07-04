import { cookieParser } from '../../helpers/cookieParser';
import {logger} from '../../helpers/logging';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function makeOrder(context, params) {
  const { methodName } = params;
  const url = new URL(context.config.api.url + context.config.api.restPath + `/rest/${methodName}`);

  logger.warn("methodName " + JSON.stringify(methodName));
  logger.warn("url " + JSON.stringify(url));

  const { data, headers } = await context.client.get(url.href, {
    headers: {
      Cookie: params.psCookieKey + '=' + params.psCookieValue + ';',
      moquiSessionToken: params.moquiSessionToken
    }
  }
  );
  const cookieObject = cookieParser(headers);
  return {data, cookieObject};
}
