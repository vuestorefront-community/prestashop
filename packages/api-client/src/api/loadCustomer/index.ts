// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
import {logger} from '../../helpers/logging';

export default async function loadCustomer(context, params) {

  const url = new URL(context.config.api.url + context.config.api.restPath + '/accountInfo');
  logger.warn('loadCustomer moquiSessionToken ' + JSON.stringify(params.moquiSessionToken));

  const { data } = await context.client.get(url.href, {
    headers: {
      Cookie: params.key + '=' + params.value + ';',
      moquiSessionToken: params.moquiSessionToken
    }
  });
  return data;
}
