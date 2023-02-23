import { computed } from '@nuxtjs/composition-api';
import { sharedRef, useVSFContext, Logger } from '@vue-storefront/core';

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
      const lang = context.$prestashop.config.app.i18n.locales &&
      context.$prestashop.config.app.i18n.locales.length > 1 &&
      context.$prestashop.config.app.$cookies.get('vsf-locale')
        ? '/' + context.$prestashop.config.app.$cookies.get('vsf-locale') : '';

      const currency = context.$prestashop.config.app.$cookies.get('vsf-currency');

      const { data, cookieObject } = await context.$prestashop.api.getAvailableCountries({ lang: lang, currency: currency });

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
