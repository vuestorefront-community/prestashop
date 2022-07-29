import {Context, Logger, useCartFactory, UseCartFactoryParams, useVSFContext} from '@vue-storefront/core';
import { useContext } from '@nuxtjs/composition-api';
import type {Cart, CartItem, PsProduct} from '@vue-storefront/prestashop-api';
import {handleRequest} from '../helpers';

const params: UseCartFactoryParams<Cart, CartItem, PsProduct> = {
  provide() {
    const context = useContext();
    return { context };
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context, { customQuery }) => {
    const data = await handleRequest(context, {method: 'get',
      url: '/cart',
      params: {
        // eslint-disable-next-line camelcase
        image_size: 'medium_default'
      }
    });

    if (data && data.code === 200) {
      return data;
    } else {
      // cart loading failed
      return null;
    }
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addItem: async (context: Context, { currentCart, product, quantity, customQuery }) => {
    let data;
    try {

      let variantObj;
      if (product.variant) {
        const _variantObj = { };
        for (const i in product.variant) {
          const splitted = product.variant[i].split('-');
          _variantObj[splitted[0]] = splitted[1];
        }
        variantObj = _variantObj;
      }

      data = await handleRequest(context, {method: 'get',
        url: '/cart',
        params: {
          // eslint-disable-next-line camelcase
          id_product: product.id,
          qty: quantity,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          // eslint-disable-next-line camelcase
          id_product_attribute: product.attributeId,
          attributes: variantObj,
          op: 'up',
          update: '1',
          action: 'update',
          // eslint-disable-next-line camelcase
          image_size: 'medium_default'
        }
      });

      if (data?.errors) throw { message: data?.errors ? data?.errors : 'Unable to add to cart.' };

      return data;
    } catch (error) {
      if (error.message) throw error;
    }
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeItem: async (context: Context, { currentCart, product, customQuery }) => {
    const data = await handleRequest(context, {method: 'get',
      url: '/cart',
      params: {
        // eslint-disable-next-line camelcase
        id_product: product.id,
        // eslint-disable-next-line camelcase
        id_product_attribute: product.productAttributeId,
        // eslint-disable-next-line camelcase
        image_size: 'medium_default',
        delete: '1',
        action: 'update'
      }
    });

    if (data.code === 200) {
      return data;
    } else {
      // remove from cart failed
      return {};
    }
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateItemQty: async (context: Context, { currentCart, product, quantity, customQuery }) => {
    let op;
    if (product.quantity < quantity) op = 'up';
    else op = 'down';

    const data = await handleRequest(context, {method: 'get',
      url: '/cart',
      params: {
        // eslint-disable-next-line camelcase
        id_product: product.id,
        // eslint-disable-next-line camelcase
        id_product_attribute: product.productAttributeId,
        qty: '1',
        op: op,
        update: '1',
        action: 'update',
        // eslint-disable-next-line camelcase
        image_size: 'medium_default'
      }
    });

    if (data.code === 200) {
      return data;
    } else {
      // add to cart failed
      return {};
    }
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  clear: async (context: Context, { currentCart }) => {
    Logger.debug('Mocked: useCart.clear');
    return {};
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  applyCoupon: async (context: Context, { currentCart, couponCode, customQuery }) => {
    Logger.debug('Mocked: useCart.applyCoupon');
    return {
      updatedCart: {},
      updatedCoupon: {}
    };
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeCoupon: async (context: Context, { currentCart, couponCode, customQuery }) => {
    Logger.debug('Mocked: useCart.removeCoupon');
    return {
      updatedCart: {}
    };
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isInCart: (context: Context, { currentCart, product }) => {
    Logger.debug('Mocked: useCart.isInCart');
    return false;
  }
};

export const useCart = useCartFactory<Cart, CartItem, PsProduct>(params);
