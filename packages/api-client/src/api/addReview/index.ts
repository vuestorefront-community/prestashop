// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function addReview(context, params) {
  const url = new URL(context.config.api.url + params.lang + '/rest/postcomment');
  url.searchParams.set('iso_currency', params.currency);
  // eslint-disable-next-line camelcase
  const { id_product, comment_title, comment_content, criterion, key, value } = params;
  const { data } = await context.client.post(url.href, {
    // eslint-disable-next-line camelcase
    id_product: id_product,
    // eslint-disable-next-line camelcase
    comment_title: comment_title,
    // eslint-disable-next-line camelcase
    comment_content: comment_content,
    criterion: {
      1: criterion
    }
  }, {
    headers: {
      Cookie: key + '=' + value + ';'
    }
  });

  return { data };
}
