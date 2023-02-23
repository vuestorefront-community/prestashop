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

    params.lang = context.$prestashop.config.app.i18n.locales &&
    context.$prestashop.config.app.i18n.locales.length > 1 &&
    context.$prestashop.config.app.$cookies.get('vsf-locale')
      ? '/' + context.$prestashop.config.app.$cookies.get('vsf-locale') : '';

    params.currency = context.$prestashop.config.app.$cookies.get('vsf-currency');

    const data = await context.$prestashop.api.getProduct(params);

    return data.psdata;
  }
};

export const useProduct = useProductFactory<Product, SearchParams>(params);
