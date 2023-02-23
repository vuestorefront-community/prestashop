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

    const { orderId } = params;
    const vsfCookieKey = context.$prestashop.config.app.$config.psCustomerCookieKey;
    const vsfCookieValue = context.$prestashop.config.app.$config.psCustomerCookieValue;

    const psCookieKey = context.$prestashop.config.app.$cookies.get(vsfCookieKey);
    const psCookieValue = context.$prestashop.config.app.$cookies.get(vsfCookieValue);

    const lang = context.$prestashop.config.app.i18n.locales &&
    context.$prestashop.config.app.i18n.locales.length > 1 &&
    context.$prestashop.config.app.$cookies.get('vsf-locale')
      ? '/' + context.$prestashop.config.app.$cookies.get('vsf-locale') : '';

    const currency = context.$prestashop.config.app.$cookies.get('vsf-currency');

    const { data, cookieObject } = await context.$prestashop.api.fetchOrders({ psCookieKey, psCookieValue, orderId, lang: lang, currency: currency });

    if (data.code === 200) {
      if (cookieObject) {
        context.$prestashop.config.app.$cookies.set(vsfCookieKey, cookieObject.vsfPsKeyCookie);
        context.$prestashop.config.app.$cookies.set(vsfCookieValue, cookieObject.vsfPsValCookie);
      }
      return data.psdata;
    } else {
      return [];
    }
  }
};
export const useUserOrder = useUserOrderFactory<Order, SearchParams>(params);
