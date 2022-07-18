import {
  Context,
  useReviewFactory,
  UseReviewFactoryParams
} from '@vue-storefront/core';
import type { Review } from '@vue-storefront/prestashop-api';
import type {
  UseReviewSearchParams as SearchParams,
  UseReviewAddParams as AddParams
} from '../types';
import {handleRequest} from '../helpers';

const params: UseReviewFactoryParams<Review, SearchParams, AddParams> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  searchReviews: async (context: Context, params) => {
    const data = await handleRequest(context, {method: 'get',
      url: '/listcomments',
      params: {
        // eslint-disable-next-line camelcase
        id_product: params.productId,
        page: params.page
      }
    });

    return data;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addReview: async (context: Context, params) => {
    const data = await handleRequest(context, {method: 'post',
      url: '/postcomment',
      params: {
        // eslint-disable-next-line camelcase
        id_product: params.id_product,
        // eslint-disable-next-line camelcase
        comment_title: params.comment_title,
        // eslint-disable-next-line camelcase
        comment_content: params.comment_content,
        criterion: { 1: params.criterion }
      }
    });

    return data;
  }
};

export const useReview = useReviewFactory<Review, SearchParams, AddParams>(params);

