import {
  Context, Logger,
  useShippingFactory,
  UseShippingParams
} from '@vue-storefront/core';
import type { ShippingAddress } from '@vue-storefront/prestashop-api';
import type {
  UseShippingAddParams as AddParams
} from '../types';

const params: UseShippingParams<ShippingAddress, AddParams> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context, { customQuery }) => {
    Logger.debug('use shipping load');
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  save: async (context: Context, params) => {
    Logger.debug('use shipping save');
  }
};

export const useShipping = useShippingFactory<ShippingAddress, AddParams>(params);
