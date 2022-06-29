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

    const psCookieKey = await context.$prestashop.config.app.$cookies.get(vsfCookieKey);
    const psCookieValue = await context.$prestashop.config.app.$cookies.get(vsfCookieValue);
    const moquiSessionToken = await context.$prestashop.config.app.$cookies.get('moquiSessionToken');

    await context.$prestashop.api.addNewAddress({address, psCookieKey, psCookieValue, moquiSessionToken });
    const { data, cookieObject } = await context.$prestashop.api.loadAddresses({ psCookieKey, psCookieValue, moquiSessionToken });
    if (data.code === 200) {
      if (cookieObject) {
        await context.$prestashop.config.app.$cookies.set(vsfCookieKey, cookieObject.vsfPsKeyCookie);
        await context.$prestashop.config.app.$cookies.set(vsfCookieValue, cookieObject.vsfPsValCookie);
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

    const psCookieKey = await context.$prestashop.config.app.$cookies.get(vsfCookieKey);
    const psCookieValue = await context.$prestashop.config.app.$cookies.get(vsfCookieValue);
    const moquiSessionToken = await context.$prestashop.config.app.$cookies.get('moquiSessionToken');

    await context.$prestashop.api.removeAddress({id, psCookieKey, psCookieValue, moquiSessionToken });
    const { data, cookieObject } = await context.$prestashop.api.loadAddresses({ psCookieKey, psCookieValue });
    if (data.code === 200) {
      if (cookieObject) {
        await context.$prestashop.config.app.$cookies.set(vsfCookieKey, cookieObject.vsfPsKeyCookie);
        await context.$prestashop.config.app.$cookies.set(vsfCookieValue, cookieObject.vsfPsValCookie);
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

    const psCookieKey = await context.$prestashop.config.app.$cookies.get(vsfCookieKey);
    const psCookieValue = await context.$prestashop.config.app.$cookies.get(vsfCookieValue);
    const moquiSessionToken = await context.$prestashop.config.app.$cookies.get('moquiSessionToken');

    await context.$prestashop.api.updateOneAddress({address, psCookieKey, psCookieValue, moquiSessionToken });
    const { data, cookieObject } = await context.$prestashop.api.loadAddresses({ psCookieKey, psCookieValue });
    if (data.code === 200) {
      if (cookieObject) {
        await context.$prestashop.config.app.$cookies.set(vsfCookieKey, cookieObject.vsfPsKeyCookie);
        await context.$prestashop.config.app.$cookies.set(vsfCookieValue, cookieObject.vsfPsValCookie);
      }
      return data.psdata;
    } else {
      return {};
    }
  },

  load: async (context: Context) => {
    const vsfCookieKey = context.$prestashop.config.app.$config.psCustomerCookieKey;
    const vsfCookieValue = context.$prestashop.config.app.$config.psCustomerCookieValue;

    const psCookieKey = await context.$prestashop.config.app.$cookies.get(vsfCookieKey);
    const psCookieValue = await context.$prestashop.config.app.$cookies.get(vsfCookieValue);
    const moquiSessionToken = await context.$prestashop.config.app.$cookies.get('moquiSessionToken');

    const { data, cookieObject } = await context.$prestashop.api.loadAddresses({ psCookieKey, psCookieValue, moquiSessionToken });
    if (data.code === 200) {
      if (cookieObject) {
        await context.$prestashop.config.app.$cookies.set(vsfCookieKey, cookieObject.vsfPsKeyCookie);
        await context.$prestashop.config.app.$cookies.set(vsfCookieValue, cookieObject.vsfPsValCookie);
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

    const psCookieKey = await context.$prestashop.config.app.$cookies.get(vsfCookieKey);
    const psCookieValue = await context.$prestashop.config.app.$cookies.get(vsfCookieValue);
    const moquiSessionToken = await context.$prestashop.config.app.$cookies.get('moquiSessionToken');

    await context.$prestashop.api.setAddress({ id, psCookieKey, psCookieValue, moquiSessionToken });

    const { data, cookieObject } = await context.$prestashop.api.loadAddresses({ psCookieKey, psCookieValue, moquiSessionToken });
    if (data.code === 200) {
      if (cookieObject) {
        await context.$prestashop.config.app.$cookies.set(vsfCookieKey, cookieObject.vsfPsKeyCookie);
        await context.$prestashop.config.app.$cookies.set(vsfCookieValue, cookieObject.vsfPsValCookie);
      }
      return data.psdata;
    } else {
      return {};
    }
  }
};

export const useUserShipping = useUserShippingFactory<Address, AddressItem>(params);
