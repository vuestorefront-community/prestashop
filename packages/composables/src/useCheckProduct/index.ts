import { computed, ref } from '@nuxtjs/composition-api';
import { useVSFContext, Logger } from '@vue-storefront/core';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useCheckProduct = () => {
  const context = useVSFContext();

  const product = ref(null);
  const loading = ref(null);

  const error = ref({
    search: null
  });

  const check = async (productId, groupId, attrId, qty) => {
    Logger.debug('checkProduct');

    try {
      loading.value = true;
      const lang = context.$prestashop.config.app.i18n.locales &&
      context.$prestashop.config.app.i18n.locales.length > 1 &&
      context.$prestashop.config.app.$cookies.get('vsf-locale')
        ? '/' + context.$prestashop.config.app.$cookies.get('vsf-locale') : '';

      const currency = context.$prestashop.config.app.$cookies.get('vsf-currency');

      const data = await context.$prestashop.api.getProduct(
        { lang: lang,
          currency: currency,
          id: productId,
          groupId: groupId,
          refresh: true,
          checkProduct: true,
          qty: qty,
          attrId: attrId }
      );

      product.value = data.psdata;

      if (data.code === 200) {

        return data;
      }
    } catch (err) {
      Logger.error('checkProduct', err);
    } finally {
      loading.value = false;
    }
  };
  return {
    check,
    product,
    loading: computed(() => loading.value),
    error: computed(() => error.value)
  };
};
