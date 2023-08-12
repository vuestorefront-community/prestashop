import { computed } from '@nuxtjs/composition-api';
import { sharedRef, useVSFContext, Logger } from '@vue-storefront/core';

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
      const vsfCookieKey = context.$prestashop.config.app.$config.psCustomerCookieKey;
      const vsfCookieValue = context.$prestashop.config.app.$config.psCustomerCookieValue;

      const psCookieKey = context.$prestashop.config.app.$cookies.get(vsfCookieKey);
      const psCookieValue = context.$prestashop.config.app.$cookies.get(vsfCookieValue);

      const lang = context.$prestashop.config.app.i18n.locales &&
      context.$prestashop.config.app.i18n.locales.length > 1 &&
      context.$prestashop.config.app.$cookies.get('vsf-locale')
        ? '/' + context.$prestashop.config.app.$cookies.get('vsf-locale') : '';

      const currency = context.$prestashop.config.app.$cookies.get('vsf-currency');

      const { data } = await context.$prestashop.api.getPaymentMethods({ psCookieKey, psCookieValue, lang: lang, currency: currency });

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
