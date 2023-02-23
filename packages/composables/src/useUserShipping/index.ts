import {
  Context,
  useUserShippingFactory,
  UseUserShippingFactoryParams
} from '@vue-storefront/core';
import type {
  UserShippingAddress as Address,
  UserShippingAddressItem as AddressItem
} from '@vue-storefront/prestashop-api';

const params: UseUserShippingFactoryParams<Address, AddressItem> = {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addAddress: async (context: Context, params) => {
    const { address } = params;
    const vsfCookieKey = context.$prestashop.config.app.$config.psCustomerCookieKey;
    const vsfCookieValue = context.$prestashop.config.app.$config.psCustomerCookieValue;

    const psCookieKey = context.$prestashop.config.app.$cookies.get(vsfCookieKey);
    const psCookieValue = context.$prestashop.config.app.$cookies.get(vsfCookieValue);

    const lang = context.$prestashop.config.app.i18n.locales &&
    context.$prestashop.config.app.i18n.locales.length > 1 &&
    context.$prestashop.config.app.$cookies.get('vsf-locale')
      ? '/' + context.$prestashop.config.app.$cookies.get('vsf-locale') : '';

    const currency = context.$prestashop.config.app.$cookies.get('vsf-currency');

    await context.$prestashop.api.addNewAddress({address, psCookieKey, psCookieValue, lang: lang, currency: currency });

    const { data, cookieObject } = await context.$prestashop.api.loadAddresses({ psCookieKey, psCookieValue, lang: lang, currency: currency });
    if (data.code === 200) {
      if (cookieObject) {
        context.$prestashop.config.app.$cookies.set(vsfCookieKey, cookieObject.vsfPsKeyCookie);
        context.$prestashop.config.app.$cookies.set(vsfCookieValue, cookieObject.vsfPsValCookie);
      }
      return data.psdata;
    } else {
      return {};
    }
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  deleteAddress: async (context: Context, params) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { id } = params.address;
    const vsfCookieKey = context.$prestashop.config.app.$config.psCustomerCookieKey;
    const vsfCookieValue = context.$prestashop.config.app.$config.psCustomerCookieValue;

    const psCookieKey = context.$prestashop.config.app.$cookies.get(vsfCookieKey);
    const psCookieValue = context.$prestashop.config.app.$cookies.get(vsfCookieValue);

    const lang = context.$prestashop.config.app.i18n.locales &&
    context.$prestashop.config.app.i18n.locales.length > 1 &&
    context.$prestashop.config.app.$cookies.get('vsf-locale')
      ? '/' + context.$prestashop.config.app.$cookies.get('vsf-locale') : '';

    const currency = context.$prestashop.config.app.$cookies.get('vsf-currency');

    await context.$prestashop.api.removeAddress({id, psCookieKey, psCookieValue, lang: lang, currency: currency });

    const { data, cookieObject } = await context.$prestashop.api.loadAddresses({ psCookieKey, psCookieValue, lang: lang, currency: currency });

    if (data.code === 200) {
      if (cookieObject) {
        context.$prestashop.config.app.$cookies.set(vsfCookieKey, cookieObject.vsfPsKeyCookie);
        context.$prestashop.config.app.$cookies.set(vsfCookieValue, cookieObject.vsfPsValCookie);
      }
      return data.psdata;
    } else {
      return {};
    }
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateAddress: async (context: Context, params) => {
    const { address } = params;
    const vsfCookieKey = context.$prestashop.config.app.$config.psCustomerCookieKey;
    const vsfCookieValue = context.$prestashop.config.app.$config.psCustomerCookieValue;

    const psCookieKey = context.$prestashop.config.app.$cookies.get(vsfCookieKey);
    const psCookieValue = context.$prestashop.config.app.$cookies.get(vsfCookieValue);

    const lang = context.$prestashop.config.app.i18n.locales &&
    context.$prestashop.config.app.i18n.locales.length > 1 &&
    context.$prestashop.config.app.$cookies.get('vsf-locale')
      ? '/' + context.$prestashop.config.app.$cookies.get('vsf-locale') : '';

    const currency = context.$prestashop.config.app.$cookies.get('vsf-currency');

    await context.$prestashop.api.updateOneAddress({address, psCookieKey, psCookieValue, lang: lang, currency: currency });

    const { data, cookieObject } = await context.$prestashop.api.loadAddresses({ psCookieKey, psCookieValue, lang: lang, currency: currency });

    if (data.code === 200) {
      if (cookieObject) {
        context.$prestashop.config.app.$cookies.set(vsfCookieKey, cookieObject.vsfPsKeyCookie);
        context.$prestashop.config.app.$cookies.set(vsfCookieValue, cookieObject.vsfPsValCookie);
      }
      return data.psdata;
    } else {
      return {};
    }
  },

  load: async (context: Context) => {
    const vsfCookieKey = context.$prestashop.config.app.$config.psCustomerCookieKey;
    const vsfCookieValue = context.$prestashop.config.app.$config.psCustomerCookieValue;

    const psCookieKey = context.$prestashop.config.app.$cookies.get(vsfCookieKey);
    const psCookieValue = context.$prestashop.config.app.$cookies.get(vsfCookieValue);

    const lang = context.$prestashop.config.app.i18n.locales &&
    context.$prestashop.config.app.i18n.locales.length > 1 &&
    context.$prestashop.config.app.$cookies.get('vsf-locale')
      ? '/' + context.$prestashop.config.app.$cookies.get('vsf-locale') : '';

    const currency = context.$prestashop.config.app.$cookies.get('vsf-currency');

    const { data, cookieObject } = await context.$prestashop.api.loadAddresses({ psCookieKey, psCookieValue, lang: lang, currency: currency });

    if (data.code === 200) {
      if (cookieObject) {
        context.$prestashop.config.app.$cookies.set(vsfCookieKey, cookieObject.vsfPsKeyCookie);
        context.$prestashop.config.app.$cookies.set(vsfCookieValue, cookieObject.vsfPsValCookie);
      }
      return data.psdata;
    } else {
      return {};
    }
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setDefaultAddress: async (context: Context, params) => {

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { id } = params.address;
    const vsfCookieKey = context.$prestashop.config.app.$config.psCustomerCookieKey;
    const vsfCookieValue = context.$prestashop.config.app.$config.psCustomerCookieValue;

    const psCookieKey = context.$prestashop.config.app.$cookies.get(vsfCookieKey);
    const psCookieValue = context.$prestashop.config.app.$cookies.get(vsfCookieValue);

    const lang = context.$prestashop.config.app.i18n.locales &&
    context.$prestashop.config.app.i18n.locales.length > 1 &&
    context.$prestashop.config.app.$cookies.get('vsf-locale')
      ? '/' + context.$prestashop.config.app.$cookies.get('vsf-locale') : '';

    const currency = context.$prestashop.config.app.$cookies.get('vsf-currency');

    await context.$prestashop.api.setAddress({ id, psCookieKey, psCookieValue, lang: lang, currency: currency });

    const { data, cookieObject } = await context.$prestashop.api.loadAddresses({ psCookieKey, psCookieValue, lang: lang, currency: currency });

    if (data.code === 200) {
      if (cookieObject) {
        context.$prestashop.config.app.$cookies.set(vsfCookieKey, cookieObject.vsfPsKeyCookie);
        context.$prestashop.config.app.$cookies.set(vsfCookieValue, cookieObject.vsfPsValCookie);
      }
      return data.psdata;
    } else {
      return {};
    }
  }
};

export const useUserShipping = useUserShippingFactory<Address, AddressItem>(params);
