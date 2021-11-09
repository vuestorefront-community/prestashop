import { computed } from '@vue/composition-api';
import { sharedRef, useVSFContext, Logger } from '@vue-storefront/core';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useBootstrap = () => {
  const context = useVSFContext();

  const result = sharedRef(null, 'bootstrap');

  const loading = sharedRef(false, 'bootstrap-loading');

  const error = sharedRef({
    search: null
  }, 'bootstrap-error');

  const boot = async () => {
    Logger.debug('bootstrap/boot');

    try {
      loading.value = true;
      const { data, cookieObject } = await context.$prestashop.api.bootstrap();
      result.value = data;
      error.value.boot = null;

      if (data.code === 200) {
        const vsfCookieKey = context.$prestashop.config.app.$config.psCustomerCookieKey;
        const vsfCookieValue = context.$prestashop.config.app.$config.psCustomerCookieValue;

        const psCookieKey = context.$prestashop.config.app.$cookies.get(vsfCookieKey);
        const psCookieValue = context.$prestashop.config.app.$cookies.get(vsfCookieValue);

        if (cookieObject && !psCookieKey && !psCookieValue) {
          context.$prestashop.config.app.$cookies.set(vsfCookieKey, cookieObject.vsfPsKeyCookie);
          context.$prestashop.config.app.$cookies.set(vsfCookieValue, cookieObject.vsfPsValCookie);
        }
        return data;
      }
    } catch (err) {
      error.value.boot = err;
      Logger.error('bootstrap/boot', err);
    } finally {
      loading.value = false;
    }
  };

  return {
    boot,
    menuItems: computed(() => result.value.psdata.menuItems),
    loading: computed(() => loading.value),
    error: computed(() => error.value)
  };
};
