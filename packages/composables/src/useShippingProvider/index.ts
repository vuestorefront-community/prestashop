import { useShippingProviderFactory, UseShippingProviderParams, Context } from '@vue-storefront/core';
import type { ShippingProvider, ShippingMethod } from '@vue-storefront/prestashop-api';

const params: UseShippingProviderParams<ShippingProvider, ShippingMethod> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context, { customQuery }) => {
    const vsfCookieKey = context.$prestashop.config.app.$config.psCustomerCookieKey;
    const vsfCookieValue = context.$prestashop.config.app.$config.psCustomerCookieValue;

    const psCookieKey = await context.$prestashop.config.app.$cookies.get(vsfCookieKey);
    const psCookieValue = await context.$prestashop.config.app.$cookies.get(vsfCookieValue);
    const { data, cookieObject } = await context.$prestashop.api.getShippingMethods({ psCookieKey, psCookieValue });
    if (data.code === 200) {
      if (cookieObject) {
        await context.$prestashop.config.app.$cookies.set(vsfCookieKey, cookieObject.vsfPsKeyCookie);
        await context.$prestashop.config.app.$cookies.set(vsfCookieValue, cookieObject.vsfPsValCookie);
      }
      return data.psdata;
    } else {
      // add to cart failed
      return {};
    }
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  save: async (context: Context, params) => {
    const vsfCookieKey = context.$prestashop.config.app.$config.psCustomerCookieKey;
    const vsfCookieValue = context.$prestashop.config.app.$config.psCustomerCookieValue;

    const psCookieKey = await context.$prestashop.config.app.$cookies.get(vsfCookieKey);
    const psCookieValue = await context.$prestashop.config.app.$cookies.get(vsfCookieValue);

    await context.$prestashop.api.setShippingMethod({ ...params, psCookieKey, psCookieValue });

    const { data, cookieObject } = await context.$prestashop.api.getShippingMethods({ psCookieKey, psCookieValue });
    if (data.code === 200) {
      if (cookieObject) {
        await context.$prestashop.config.app.$cookies.set(vsfCookieKey, cookieObject.vsfPsKeyCookie);
        await context.$prestashop.config.app.$cookies.set(vsfCookieValue, cookieObject.vsfPsValCookie);
      }
      return data.psdata;
    } else {
      // add to cart failed
      return {};
    }
  }
};

export const useShippingProvider = useShippingProviderFactory<ShippingProvider, ShippingMethod>(params);
