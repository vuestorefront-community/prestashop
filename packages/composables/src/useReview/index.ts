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

    const lang = context.$prestashop.config.app.i18n.locales &&
    context.$prestashop.config.app.i18n.locales.length > 1 &&
    context.$prestashop.config.app.$cookies.get('vsf-locale')
      ? '/' + context.$prestashop.config.app.$cookies.get('vsf-locale') : '';

    const currency = context.$prestashop.config.app.$cookies.get('vsf-currency');

    const item = await context.$prestashop.api.getReview({ ...searchParams, lang: lang, currency: currency }, customQuery);

    return item;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addReview: async (context: Context, params) => {
    const { customQuery, ...AddParams } = params;

    const cookieKey = context.$prestashop.config.app.$config.psCustomerCookieKey;
    const cookieValue = context.$prestashop.config.app.$config.psCustomerCookieValue;

    const key = context.$prestashop.config.app.$cookies.get(cookieKey);
    const value = context.$prestashop.config.app.$cookies.get(cookieValue);

    const lang = context.$prestashop.config.app.i18n.locales &&
    context.$prestashop.config.app.i18n.locales.length > 1 &&
    context.$prestashop.config.app.$cookies.get('vsf-locale')
      ? '/' + context.$prestashop.config.app.$cookies.get('vsf-locale') : '';

    const currency = context.$prestashop.config.app.$cookies.get('vsf-currency');

    const item = await context.$prestashop.api.addReview({ ...AddParams, customQuery, key, value, lang: lang, currency: currency });

    return item;
  }
};

export const useReview = useReviewFactory<Review, SearchParams, AddParams>(params);

