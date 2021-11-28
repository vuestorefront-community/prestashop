import {
  Context,
  useProductFactory,
  UseProductFactoryParams
} from '@vue-storefront/core';
import type { Product } from '@vue-storefront/prestashop-api';
import type {
  UseProductSearchParams as SearchParams
} from '../types';

const params: UseProductFactoryParams<Product, SearchParams> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  productsSearch: async (context: Context, params) => {
    let obj = params
    if (params.refresh) {
      obj = {}
      obj['refresh'] = true;
      obj['id'] = params.id;
      obj['group'] = params.group;
      obj['attr'] = params.attr
    }
    const data = await context.$prestashop.api.getProduct(obj);
    return data.psdata;
  }
};

export const useProduct = useProductFactory<Product, SearchParams>(params);
