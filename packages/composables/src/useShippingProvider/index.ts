import {useShippingProviderFactory, UseShippingProviderParams, Context, Logger} from '@vue-storefront/core';
import type { ShippingProvider, ShippingMethod } from '@vue-storefront/prestashop-api';

const params: UseShippingProviderParams<ShippingProvider, ShippingMethod> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context, { customQuery }) => {
    const vsfCookieKey = context.$prestashop.config.app.$config.psCustomerCookieKey;
    const vsfCookieValue = context.$prestashop.config.app.$config.psCustomerCookieValue;

    const psCookieKey = await context.$prestashop.config.app.$cookies.get(vsfCookieKey);
    const psCookieValue = await context.$prestashop.config.app.$cookies.get(vsfCookieValue);
    const moquiSessionToken = await context.$prestashop.config.app.$cookies.get('moquiSessionToken');

    const { data, cookieObject } = await context.$prestashop.api.getShippingMethods({ psCookieKey, psCookieValue, moquiSessionToken });
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

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { shippingMethodId, addressId } = params;
    const vsfCookieKey = context.$prestashop.config.app.$config.psCustomerCookieKey;
    const vsfCookieValue = context.$prestashop.config.app.$config.psCustomerCookieValue;

    const psCookieKey = await context.$prestashop.config.app.$cookies.get(vsfCookieKey);
    const psCookieValue = await context.$prestashop.config.app.$cookies.get(vsfCookieValue);
    const moquiSessionToken = await context.$prestashop.config.app.$cookies.get('moquiSessionToken');

    await context.$prestashop.api.setShippingMethod({ shippingMethodId, addressId, psCookieKey, psCookieValue, moquiSessionToken });

    const { data, cookieObject } = await context.$prestashop.api.getShippingMethods({ psCookieKey, psCookieValue, moquiSessionToken });
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
