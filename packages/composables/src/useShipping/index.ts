import {
  Context,
  useShippingFactory,
  UseShippingParams
} from '@vue-storefront/core';
import type { ShippingAddress } from '@vue-storefront/prestashop-api';
import type {
  UseShippingAddParams as AddParams
} from '../types';

const params: UseShippingParams<ShippingAddress, AddParams> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context, { customQuery }) => {
    const vsfCookieKey = context.$prestashop.config.app.$config.psCustomerCookieKey;
    const vsfCookieValue = context.$prestashop.config.app.$config.psCustomerCookieValue;

    const psCookieKey = context.$prestashop.config.app.$cookies.get(vsfCookieKey);
    const psCookieValue = context.$prestashop.config.app.$cookies.get(vsfCookieValue);

    const { data } = await context.$prestashop.api.loadAddresses({ psCookieKey, psCookieValue });

    return data.psdata;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  save: async (context: Context, { shippingDetails, customQuery }) => {
    console.log('Mocked: useShipping.save');
    return {};
  }
};

export const useShipping = useShippingFactory<ShippingAddress, AddParams>(params);
