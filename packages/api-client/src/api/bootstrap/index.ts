export default async function bootstrap(context) {
  const url = new URL('/rest/lightbootstrap', context.config.api.url);

  url.searchParams.set('menu_with_images', 'single');

  const { data } = await context.client.get(url.href);

  return data;
}
