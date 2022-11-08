
export default async ({ app, $vsf }) => {
  const currentPath = app.context.route.fullPath.split('/checkout/')[1];

  const vsfCookieKey = $vsf.$prestashop.config.app.$config.psCustomerCookieKey;
  const vsfCookieValue = $vsf.$prestashop.config.app.$config.psCustomerCookieValue;

  const psCookieKey = $vsf.$prestashop.config.app.$cookies.get(vsfCookieKey);
  const psCookieValue = $vsf.$prestashop.config.app.$cookies.get(vsfCookieValue);

  const lang = $vsf.$prestashop.config.app.i18n.locales && $vsf.$prestashop.config.app.i18n.locales.length > 1 ? '/' + $vsf.$prestashop.config.app.$cookies.get('vsf-locale') : '';
  const currency = $vsf.$prestashop.config.app.$cookies.get('vsf-currency');

  switch (currentPath) {
    case 'payment':
      const customer = await $vsf.$prestashop.api.loadCustomer({key: psCookieKey, value: psCookieValue, lang: lang, currency: currency});

      if (customer.code === 410) {
        app.context.redirect('/checkout/user-account');
      }

      const { data } = await $vsf.$prestashop.api.getPaymentMethods({ psCookieKey, psCookieValue, lang: lang, currency: currency});

      if (data.code === 200) {
        if (Object.keys(data.psdata).length === 0) {
          app.context.redirect('/checkout/shipping');
        }
      } else {
        app.context.redirect('/checkout/shipping');
      }
      break;
    case 'shipping':
      const result = await $vsf.$prestashop.api.loadCustomer({key: psCookieKey, value: psCookieValue, lang: lang, currency: currency});
      if (result.code === 410) {
        app.context.redirect('/checkout/user-account');
      }
      break;
  }
};
