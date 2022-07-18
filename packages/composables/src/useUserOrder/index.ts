import {
  Context,
  useUserOrderFactory,
  UseUserOrderFactoryParams
} from '@vue-storefront/core';
import type { Order } from '@vue-storefront/prestashop-api';
import type {
  useUserOrderSearchParams as SearchParams
} from '../types';
import {handleRequest} from '../helpers';

const params: UseUserOrderFactoryParams<Order, SearchParams> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  searchOrders: async (context: Context, params) => {

    const data = await handleRequest(context, {method: 'get',
      url: '/orderhistory',
      params: {
        // eslint-disable-next-line camelcase
        id_order: params.orderId
      }
    });

    if (data.code === 200) {
      return data.psdata;
    } else {
      return [];
    }
  }
};
export const useUserOrder = useUserOrderFactory<Order, SearchParams>(params);
