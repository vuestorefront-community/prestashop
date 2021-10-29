// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function addReview(context, params) {
    const url = new URL('/rest/postcomment', context.config.api.url);

    const { id_product, comment_title, comment_content, criterion, key, value } = params;
    const { data, headers } = await context.client.post(url.href, {
        id_product,
        comment_title,
        comment_content,
        criterion,
        headers: {
            Cookie: key + '=' + value + ';'
        }
    });
    return { data }
}
