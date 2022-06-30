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

const params: UseReviewFactoryParams<Review, SearchParams, AddParams> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  searchReviews: async (context: Context, params) => {
    const { customQuery, ...searchParams } = params;
    const item = await context.$prestashop.api.getReview(searchParams, customQuery);
    return item;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addReview: async (context: Context, params) => {
    const { customQuery, ...AddParams } = params;

    const cookieKey = context.$prestashop.config.app.$config.psCustomerCookieKey;
    const cookieValue = context.$prestashop.config.app.$config.psCustomerCookieValue;
    const moquiSessionToken = await context.$prestashop.config.app.$cookies.get('moquiSessionToken');

    const key = await context.$prestashop.config.app.$cookies.get(cookieKey);
    const value = await context.$prestashop.config.app.$cookies.get(cookieValue);

    const item = await context.$prestashop.api.addReview({ ...AddParams, customQuery, key, value, moquiSessionToken });
    return item;
  }
};

export const useReview = useReviewFactory<Review, SearchParams, AddParams>(params);

