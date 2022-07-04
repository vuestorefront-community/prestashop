import {cookieParser} from '../../helpers/cookieParser';
import {logger} from '../../helpers/logging';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function bootstrap(context, params) {
  const url = new URL(context.config.api.url + context.config.api.restPath + '/lightbootstrap');

  url.searchParams.set('menu_with_images', 'single');
  url.searchParams.set('requestHostName', context?.req?.headers?.host);

  // logger.warn("params " + JSON.stringify(params));
  // console.log("params " + JSON.stringify(params));

  // logger.info('Calling rest data from: ' + url.href);
  if (params.psCookieValue && params.moquiSessionToken) {
    logger.warn("moquiSessionToken");
    console.log("moquiSessionToken");

    const { data, headers } = await context.client.get(url.href, {
      headers: {
        Cookie: params.key + '=' + params.value + ';',
        moquiSessionToken: params.moquiSessionToken
      }
    });
    const cookieObject = cookieParser(headers);
    return {data, headers, cookieObject};
  } else {
    logger.warn("no moquiSessionToken");
    console.log("no moquiSessionToken");
    const { data, headers } = await context.client.get(url.href);
    const cookieObject = cookieParser(headers);
    return {data, headers, cookieObject};
  }

  // logger.info('Data');
  // logger.info(data);
  // logger.warn('Headers');
  // logger.warn(headers);

  // logger.warn('Client');
  // logger.warn(context.client);

  // logger.warn('Client Headers');
  // logger.warn(context.client.defaults.headers);

  // logger.warn('context.$prestashop.config');
  // logger.warn(context.$prestashop.config.app);

  // logger.info('cookieParser\'s cookieObject');
  // logger.info(cookieObject);
}
