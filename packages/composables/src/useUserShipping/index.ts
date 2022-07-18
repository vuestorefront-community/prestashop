import {
  Context,
  useUserShippingFactory,
  UseUserShippingFactoryParams
} from '@vue-storefront/core';
import type {
  UserShippingAddress as Address,
  UserShippingAddressItem as AddressItem
} from '@vue-storefront/prestashop-api';
import {handleRequest} from '../helpers';

const params: UseUserShippingFactoryParams<Address, AddressItem> = {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addAddress: async (context: Context, params) => {

    await handleRequest(context, {method: 'post',
      url: '/address',
      data: params.address
    });

    const data = await handleRequest(context, {method: 'get', url: '/alladdresses'});

    if (data.code === 200) {
      return data.psdata;
    } else {
      return {};
    }
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  deleteAddress: async (context: Context, params) => {
    await handleRequest(context, {method: 'delete',
      url: '/address',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line camelcase
      data: { id_address: params.address.id }
    });

    const data = await handleRequest(context, {method: 'get', url: '/alladdresses'});

    if (data.code === 200) {
      return data.psdata;
    } else {
      return {};
    }
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateAddress: async (context: Context, params) => {
    await handleRequest(context, {method: 'post',
      url: '/address',
      data: params.address
    });

    const data = await handleRequest(context, {method: 'get', url: '/alladdresses'});

    if (data.code === 200) {
      return data.psdata;
    } else {
      return {};
    }
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context, params) => {
    const data = await handleRequest(context, {method: 'get', url: '/alladdresses'});

    if (data.code === 200) {
      return data.psdata;
    } else {
      return {};
    }
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setDefaultAddress: async (context: Context, params) => {
    await handleRequest(context, {method: 'post',
      url: '/setaddresscheckout',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line camelcase
      data: { id_address: params.address.id }
    });

    const data = await handleRequest(context, {method: 'get', url: '/alladdresses'});
    if (data.code === 200) {
      return data.psdata;
    } else {
      return {};
    }
  }
};

export const useUserShipping = useUserShippingFactory<Address, AddressItem>(params);
