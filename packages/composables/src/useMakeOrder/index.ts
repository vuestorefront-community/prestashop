import {
  Context,
  useMakeOrderFactory,
  UseMakeOrderFactoryParams
} from '@vue-storefront/core';
import type { Order } from '@vue-storefront/prestashop-api';
import {handleRequest} from '../helpers';

const factoryParams: UseMakeOrderFactoryParams<Order> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  make: async (context: Context, params) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { methodName } = params;

    const data = await handleRequest(context, {method: 'get', url: '/rest/${methodName}'});

    if (data.code === 200) {
      return data.psdata;
    } else {
      return {};
    }
  }
};

export const useMakeOrder = useMakeOrderFactory<Order>(factoryParams);
