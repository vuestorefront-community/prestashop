import { computed } from '@nuxtjs/composition-api';
import { sharedRef, useVSFContext, Logger } from '@vue-storefront/core';
import {handleRequest} from '../helpers';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const usePayment = () => {
  const context = useVSFContext();

  const payment = sharedRef(null, 'payment');

  const loading = sharedRef(false, 'usePayment-loading');

  const error = sharedRef({
    search: null
  }, 'usePayment-error');

  const load = async () => {
    Logger.debug('usePayment/boot');

    try {
      loading.value = true;

      const data = await handleRequest(context, {method: 'get', url: '/paymentoptions'});

      error.value.boot = null;

      if (data.code === 200) {
        payment.value = data.psdata;

        return data.psdata;
      } else {
        return {};
      }
    } catch (err) {
      error.value.boot = err;
      Logger.error('usePayment/boot', err);
    } finally {
      loading.value = false;
    }
  };

  return {
    load,
    payment: payment,
    loading: computed(() => loading.value),
    error: computed(() => error.value)
  };
};
