import { Store } from '@vue-storefront/prestashop-api';
import {Context, Logger, useStoreFactory} from '@vue-storefront/core';

export const useStore = useStoreFactory<Store>({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load(context: Context, params) {
    Logger.debug('Mocked: useStore.load');

    return Promise.resolve({});
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  change(context: Context, params) {
    Logger.debug('Mocked: useStore.change');

    return Promise.resolve({});
  }
});
