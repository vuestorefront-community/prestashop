import {
  Context,
  useProductFactory,
  UseProductFactoryParams
} from '@vue-storefront/core';
import type { Product } from '@vue-storefront/prestashop-api';
import type {
  UseProductSearchParams as SearchParams
} from '../types';
import {handleRequest} from '../helpers';

const params: UseProductFactoryParams<Product, SearchParams> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  productsSearch: async (context: Context, params) => {
    const { variant } = params;

    if (variant) {
      const variantObj = { };
      params.refresh = true;
      for (const i in variant) {
        const splitted = variant[i].split('-');
        variantObj[splitted[0]] = splitted[1];
      }
      params.variantObj = variantObj;
    }

    let data;
    if (params.id) {
      data = await handleRequest(context, {method: 'get',
        url: '/productdetail',
        params: {
          // eslint-disable-next-line camelcase
          product_id: params.id,
          refresh: params.refresh,
          group: params.variantObj
        }
      });

    } else if (params.featured) {
      data = await handleRequest(context, {method: 'get', url: '/featuredproducts'});
    }
    return data.psdata;
  }
};

export const useProduct = useProductFactory<Product, SearchParams>(params);
