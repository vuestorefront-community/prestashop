import {useShippingProviderFactory, UseShippingProviderParams, Context, Logger} from '@vue-storefront/core';
import type { ShippingProvider, ShippingMethod } from '@vue-storefront/prestashop-api';
import {handleRequest} from '../helpers';

const params: UseShippingProviderParams<ShippingProvider, ShippingMethod> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context, { customQuery }) => {
    const data = await handleRequest(context, {method: 'get', url: '/carriers'});

    if (data.code === 200) {
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
    const { shippingMethod } = params;


    await handleRequest(context, {method: 'post',
      url: '/setcarriercheckout',
      data: {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line camelcase
        id_address: shippingMethod.addressId,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line camelcase
        id_carrier: shippingMethod.carrierId
      }
    });

    const data = await handleRequest(context, {method: 'get', url: '/carriers'});

    if (data.code === 200) {
      return data.psdata;
    } else {
      // add to cart failed
      return {};
    }
  }
};

export const useShippingProvider = useShippingProviderFactory<ShippingProvider, ShippingMethod>(params);
