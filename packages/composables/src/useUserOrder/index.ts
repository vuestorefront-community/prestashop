import {
  Context,
  useUserOrderFactory,
  UseUserOrderFactoryParams
} from '@vue-storefront/core';
import type { Order } from '@vue-storefront/prestashop-api';
import type {
  useUserOrderSearchParams as SearchParams
} from '../types';

const params: UseUserOrderFactoryParams<Order, SearchParams> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  searchOrders: async (context: Context, params) => {
    const vsfCookieKey = context.$prestashop.config.app.$config.psCustomerCookieKey;
    const vsfCookieValue = context.$prestashop.config.app.$config.psCustomerCookieValue;

    const psCookieKey = context.$prestashop.config.app.$cookies.get(vsfCookieKey);
    const psCookieValue = context.$prestashop.config.app.$cookies.get(vsfCookieValue);

    const result: any = await context.$prestashop.api.fetchOrders({psCookieKey, psCookieValue});
    if (result) {
      return result.psdata;
    }
    return [];

  }
};

export const useUserOrder = useUserOrderFactory<Order, SearchParams>(params);
