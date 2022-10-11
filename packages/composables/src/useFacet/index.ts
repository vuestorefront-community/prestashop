import {
  Context,
  useFacetFactory,
  FacetSearchResult
} from '@vue-storefront/core';
import type {
  UseFacetSearchParams as SearchParams
} from '../types';

const factoryParams = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  search: async (context: Context, params: FacetSearchResult<SearchParams>) => {

    const lang = context.$prestashop.config.app.i18n.locales && context.$prestashop.config.app.i18n.locales.lenght > 1 ? '/' + context.$prestashop.config.app.$cookies.get('vsf-locale') : '';
    const data = await context.$prestashop.api.getCategoryProducts({ ...params, lang: lang });

    return data.psdata;
  }
};

export const useFacet = useFacetFactory<SearchParams>(factoryParams);
