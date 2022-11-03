import {cookieParser} from '../../helpers/cookieParser';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function bootstrap(context, params) {
  const url = new URL(context.config.api.url + params.lang + '/rest/lightbootstrap');

  url.searchParams.set('menu_with_images', 'single');
  url.searchParams.set('iso_currency', params.currency);
  const { data, headers } = await context.client.get(url.href);
  const cookieObject = cookieParser(headers);

  return {data, cookieObject};
}
