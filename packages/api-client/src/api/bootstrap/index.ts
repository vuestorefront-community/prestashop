import {cookieParser} from '../../helpers/cookieParser';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function bootstrap(context) {
  const url = new URL('/rest/lightbootstrap', context.config.api.url);

  url.searchParams.set('menu_with_images', 'single');

  const { data, headers } = await context.client.get(url.href);
  const cookieObject = cookieParser(headers);

  return {data, cookieObject};
}
