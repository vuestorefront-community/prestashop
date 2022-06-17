import {logger} from '../../helpers/logging';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function getProduct(context, params) {
  if (params.id) {
    const url = new URL(context.config.api.url + context.config.api.restPath + '/productdetail');
    params.id && url.searchParams.set('product_id', params.id);
    if (params.refresh) {
      params.refresh && url.searchParams.set('refresh', params.refresh);
      logger.warn(JSON.stringify(params.variantObj));

      // url.searchParams.set('group', JSON.stringify(params.variantObj));
    }

    logger.info('Calling rest data from: ' + url.href);
    const { data } = await context.client.get(url.href, {
      group: params.variantObj
    });
    logger.info('Data');
    logger.info(data);
    logger.info('data.groups');
    logger.info(data.groups);

    return data;
  } else if (params.featured) {
    const url = new URL(context.config.api.url + context.config.api.restPath + '/featuredproducts');

    logger.info('Calling rest data from: ' + url.href);
    const { data } = await context.client.get(url.href);
    // logger.info('Data');
    // logger.info(data);
    return data;
  }
}
