import { computed } from '@nuxtjs/composition-api';
import { sharedRef, useVSFContext, Logger } from '@vue-storefront/core';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useBootstrap = () => {
  const context = useVSFContext();

  const menuItems = sharedRef(null, 'menuItems');
  const languages = sharedRef(null, 'languages');
  const currencies = sharedRef(null, 'currencies');

  const loading = sharedRef(false, 'bootstrap-loading');

  const menuMouseStatus = sharedRef(false, 'bootstrap-menuMouseStatus');

  const error = sharedRef({
    search: null
  }, 'bootstrap-error');

  const boot = async () => {
    Logger.debug('bootstrap/boot');

    try {
      loading.value = true;
      const lang = context.$prestashop.config.app.i18n.locales &&
      context.$prestashop.config.app.i18n.locales.length > 1 &&
      context.$prestashop.config.app.$cookies.get('vsf-locale')
        ? '/' + context.$prestashop.config.app.$cookies.get('vsf-locale') : '';

      const currency = context.$prestashop.config.app.$cookies.get('vsf-currency');

      const { data, cookieObject } = await context.$prestashop.api.bootstrap({ lang: lang, currency: currency });

      error.value.boot = null;

      if (data.code === 200) {
        menuItems.value = data.psdata.menuItems;
        languages.value = data.psdata.languages.languages;
        currencies.value = data.psdata.currencies.currencies;
        const dataModel = {};
        menuItems.value.forEach(el => dataModel[el.label] = false);
        menuMouseStatus.value = dataModel;

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
    menuMouseStatus,
    menuItems: menuItems,
    languages: languages,
    currencies: currencies,
    loading: computed(() => loading.value),
    error: computed(() => error.value)
  };
};
