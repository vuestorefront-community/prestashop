import {cookieParser} from '../../helpers/cookieParser';
import {logger} from '../../helpers/logging';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function bootstrap(context) {
  const url = new URL(context.config.api.url + context.config.api.restPath + '/lightbootstrap');

  url.searchParams.set('menu_with_images', 'single');
  url.searchParams.set('requestHostName', context?.req?.headers?.host);

  // logger.info('Calling rest data from: ' + url.href);
  const { data, headers } = await context.client.get(url.href);
  // logger.info('Data');
  // logger.info(data);
  // logger.warn('Headers');
  // logger.warn(headers);
  const cookieObject = cookieParser(headers);
  // logger.info('cookieParser\'s cookieObject');
  // logger.info(cookieObject);

  return {data, cookieObject};
}
