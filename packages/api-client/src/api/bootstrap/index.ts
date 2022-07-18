import {cookieParser} from '../../helpers/cookieParser';
import {logger} from '../../helpers/logging';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function bootstrap(context, params) {
  // logger.warn("params " + JSON.stringify(params));
  // console.log("params " + JSON.stringify(params));

  // logger.warn('context.$prestashop.config.app.$cookies.get(\'moquiSessionToken\') ' + JSON.stringify(context.$prestashop.config.app.$cookies.get('moquiSessionToken')));
  // console.log('context.$prestashop.config.app.$cookies.get(\'moquiSessionToken\') ' + JSON.stringify(context.$prestashop.config.app.$cookies.get('moquiSessionToken')));

  let response;
  let cookieObject;
  try {
    logger.warn(JSON.stringify(params.url) + ' context.client.defaults.headers ' + JSON.stringify(context.client.defaults.headers.common));
    response = await context.client(params);
    // logger.warn(JSON.stringify(params.url) + ' response.headers ' + JSON.stringify(response.headers));
    cookieObject = cookieParser(response?.headers);

    return { data: response?.data, headers: response?.headers, cookieObject };
  } catch (error) {
    // TODO: Only log this in dev
    logger.error(error);
    if (response) {
      cookieObject = cookieParser(response?.headers);
      return { data: response?.data, headers: response?.headers, cookieObject };
    }
  }

  // logger.info('Data');
  // logger.info(data?.psdata?.menuItems);

  // logger.warn('Headers');
  // logger.warn(headers);
  //
  // logger.warn('Client');
  // logger.warn(context.client);
  //
  // logger.warn('Client Headers');
  // logger.warn(context.client.defaults.headers);
  //
  // logger.warn('context.$prestashop.config');
  // logger.warn(context.$prestashop.config.app);
  //
  // logger.info('cookieParser\'s cookieObject');
  // logger.info(cookieObject);
}
