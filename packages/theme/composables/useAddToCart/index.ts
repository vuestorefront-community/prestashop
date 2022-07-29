import { Logger } from '@vue-storefront/core';
import { productGetters, useCart } from '@vue-storefront/prestashop';
import { useRouter, useContext } from '@nuxtjs/composition-api';
import { useUiNotification } from '~/composables';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useAddToCart = () => {
  const router = useRouter();
  const { app } = useContext();
  const { cart, addItem: addItemToCartBase, error: cartError } = useCart();
  const { send: sendNotification } = useUiNotification();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const addItemToCart = (params: { product: any, variant: any, quantity: number }) => {

    params.product.variant = params.variant;

    if (productGetters.getIsVirtual(params.product) && !params.variant) {
      // Logger.debug('addItemToCart redirecting to: ' + JSON.stringify(app.localePath(`/p/${productGetters.getId(params.product)}/${productGetters.getSlug(params.product)}`)));
      return router.push(app.localePath(`/p/${productGetters.getId(params.product)}/${productGetters.getSlug(params.product)}`));
    }

    // console.log('addItemToCart calling addItemToCart');
    addItemToCartBase(params)
      .then(() => {
        if (cartError.value.addItem) throw {message: cartError.value.addItem?.message};
        // console.log('addItemToCart cart: ' + JSON.stringify(cart));
        // console.log('addItemToCart cartError.value.addItem: ' + JSON.stringify(cartError.value.addItem));
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        sendNotification({
          message: 'Product has been successfully added to cart!',
          type: 'success',
          persist: false,
          icon: 'check'
        });
      })
      .catch((error) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        sendNotification({
          message: (error.message ? error.message : 'Failed to add to cart') as string,
          type: 'danger',
          persist: false,
          icon: 'check'
        });
      });

  };

  return {
    addItemToCart
  };
};
export default useAddToCart;
