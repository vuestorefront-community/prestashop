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
    const data = await context.$prestashop.api.getCategoryProducts(params);

    return data.psdata;
  }
};

export const useFacet = useFacetFactory<SearchParams>(factoryParams);
