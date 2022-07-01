import { computed } from '@nuxtjs/composition-api';
import { sharedRef, useVSFContext, Logger } from '@vue-storefront/core';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useBootstrap = () => {
  const context = useVSFContext();

  const menuItems = sharedRef(null, 'menuItems');

  const loading = sharedRef(false, 'bootstrap-loading');

  const error = sharedRef({
    search: null
  }, 'bootstrap-error');

  const boot = async () => {
    Logger.debug('bootstrap/boot');

    try {
      loading.value = true;
      const { data, headers, cookieObject } = await context.$prestashop.api.bootstrap();
      error.value.boot = null;

      // Logger.error("boot headers['moquisessiontoken']: "+JSON.stringify(headers['moquisessiontoken']));

      // if (headers['moquisessiontoken'] || headers['x-csrf-token']) {
      //   Logger.error("headers['moquisessiontoken']");
      //   Logger.error(headers['moquisessiontoken']);
      //
      // }

      await context.$prestashop.config.app.$cookies.set('moquiSessionToken', headers['moquisessiontoken'] ? headers['moquisessiontoken'] : headers['x-csrf-token']);

      // Logger.error("boot context.$prestashop.config.app.$cookies.get('moquiSessionToken'): "+JSON.stringify(context.$prestashop.config.app.$cookies.get('moquiSessionToken')));

      if (data?.code === 200) {
        menuItems.value = data.psdata.menuItems;
        const vsfCookieKey = context.$prestashop.config.app.$config.psCustomerCookieKey;
        const vsfCookieValue = context.$prestashop.config.app.$config.psCustomerCookieValue;

        const psCookieKey = await context.$prestashop.config.app.$cookies.get(vsfCookieKey);
        const psCookieValue = await context.$prestashop.config.app.$cookies.get(vsfCookieValue);

        if (cookieObject && !psCookieKey && !psCookieValue) {
          await context.$prestashop.config.app.$cookies.set(vsfCookieKey, cookieObject.vsfPsKeyCookie);
          await context.$prestashop.config.app.$cookies.set(vsfCookieValue, cookieObject.vsfPsValCookie);
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
    menuItems: menuItems,
    loading: computed(() => loading.value),
    error: computed(() => error.value)
  };
};
