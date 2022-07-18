import { computed } from '@nuxtjs/composition-api';
import { sharedRef, useVSFContext, Logger } from '@vue-storefront/core';
import {handleRequest} from '../helpers';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useCountryList = () => {
  const context = useVSFContext();

  const result = sharedRef(null, 'bootstrap');

  const loading = sharedRef(false, 'bootstrap-loading');

  const error = sharedRef({
    search: null
  }, 'country-list-error');

  const load = async () => {
    Logger.debug('country-list/load');

    try {
      loading.value = true;

      const data = await handleRequest(context, {method: 'get', url: '/addressform'});

      result.value = data;
      error.value.boot = null;

      if (data.code === 200) {
        return data;
      }
    } catch (err) {
      error.value.boot = err;
      Logger.error('Country-list/boot', err);
    } finally {
      loading.value = false;
    }
  };

  return {
    load,
    countries: computed(() => result.value.psdata),
    loading: computed(() => loading.value),
    error: computed(() => error.value)
  };
};
