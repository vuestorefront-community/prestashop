
export default async ({ app, $vsf }) => {
  const currentPath = app.context.route.fullPath.split('/checkout/')[1];
  console.log(currentPath);

  if (currentPath === 'payment') {
    const vsfCookieKey = $vsf.$prestashop.config.app.$config.psCustomerCookieKey;
    const vsfCookieValue = $vsf.$prestashop.config.app.$config.psCustomerCookieValue;

    const psCookieKey = $vsf.$prestashop.config.app.$cookies.get(vsfCookieKey);
    const psCookieValue = $vsf.$prestashop.config.app.$cookies.get(vsfCookieValue);

    const { data } = await $vsf.$prestashop.api.getPaymentMethods({ psCookieKey, psCookieValue });

    if (data.code === 200) {
      if (Object.keys(data.psdata).length === 0) {
        app.context.redirect('/checkout/shipping');
      }
    } else {
      app.context.redirect('/checkout/shipping');
    }
  }
};
