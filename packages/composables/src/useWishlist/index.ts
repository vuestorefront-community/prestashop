/* istanbul ignore file */
import {
  Context,
  useWishlistFactory,
  UseWishlistFactoryParams
} from '@vue-storefront/core';
import type {Wishlist, WishlistItem, Product} from '@vue-storefront/prestashop-api';

const params: UseWishlistFactoryParams<Wishlist, WishlistItem, Product> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context, {customQuery}) => {
    const vsfCookieKey = context.$prestashop.config.app.$config.psCustomerCookieKey;
    const vsfCookieValue = context.$prestashop.config.app.$config.psCustomerCookieValue;

    const psCookieKey = context.$prestashop.config.app.$cookies.get(vsfCookieKey);
    const psCookieValue = context.$prestashop.config.app.$cookies.get(vsfCookieValue);

    const lang = context.$prestashop.config.app.i18n.locales &&
    context.$prestashop.config.app.i18n.locales.length > 1 &&
    context.$prestashop.config.app.$cookies.get('vsf-locale')
        ? '/' + context.$prestashop.config.app.$cookies.get('vsf-locale') : '';

    const {data, cookieObject} = await context.$prestashop.api.getWishlistItems({
      psCookieKey,
      psCookieValue,
      lang: lang,
    });

    if (cookieObject) {
      context.$prestashop.config.app.$cookies.set(vsfCookieKey, cookieObject.vsfPsKeyCookie);
      context.$prestashop.config.app.$cookies.set(vsfCookieValue, cookieObject.vsfPsValCookie);
    }
    // context.$prestashop.config.app.$cookies.set("wishlist", data);

    if (data && data.code === 200) {
      return data;
    } else {
      // wishlist loading failed
      return null;
    }
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addItem: async (context: Context, {currentWishlist, product}) => {

    const vsfCookieKey = context.$prestashop.config.app.$config.psCustomerCookieKey;
    const vsfCookieValue = context.$prestashop.config.app.$config.psCustomerCookieValue;
    //
    const psCookieKey = context.$prestashop.config.app.$cookies.get(vsfCookieKey);
    const psCookieValue = context.$prestashop.config.app.$cookies.get(vsfCookieValue);
    //
    const lang = context.$prestashop.config.app.i18n.locales &&
    context.$prestashop.config.app.i18n.locales.length > 1 &&
    context.$prestashop.config.app.$cookies.get('vsf-locale')
        ? '/' + context.$prestashop.config.app.$cookies.get('vsf-locale') : '';
    const {data, cookieObject} = await context.$prestashop.api.addToWishlist({
      psCookieKey,
      psCookieValue,
      product,
      lang: lang,
    });

    if (data && data.code === 200) {
      if (cookieObject) {
        context.$prestashop.config.app.$cookies.set(vsfCookieKey, cookieObject.vsfPsKeyCookie);
        context.$prestashop.config.app.$cookies.set(vsfCookieValue, cookieObject.vsfPsValCookie);
      }

      /// add product to the local wishlist if already loaded!
    if (currentWishlist != undefined && currentWishlist.psdata.products != undefined) {
       const prod = (product as any);
       currentWishlist.psdata.products.push({
         id_product: prod.id,
         name: prod.name,
         cover: {"url": prod.coverImageMedium},
         regular_price_amount: prod.regularPrice,
         price_amount: prod.discountPrice,
         reference: prod.reference,
       })
    } else {
        console.log('wishlist doesn\'t loaded!');
    }

      return currentWishlist;
    } else {
      // add to cart failed
      return {};
    }
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeItem: async (context: Context, {currentWishlist, product}) => {
    // alert(JSON.stringify(currentWishlist));
    const vsfCookieKey = context.$prestashop.config.app.$config.psCustomerCookieKey;
    const vsfCookieValue = context.$prestashop.config.app.$config.psCustomerCookieValue;
    //
    const psCookieKey = context.$prestashop.config.app.$cookies.get(vsfCookieKey);
    const psCookieValue = context.$prestashop.config.app.$cookies.get(vsfCookieValue);
    //
    const lang = context.$prestashop.config.app.i18n.locales &&
    context.$prestashop.config.app.i18n.locales.length > 1 &&
    context.$prestashop.config.app.$cookies.get('vsf-locale')
        ? '/' + context.$prestashop.config.app.$cookies.get('vsf-locale') : '';
    const {data, cookieObject} = await context.$prestashop.api.removeFromWishlist({
      psCookieKey,
      psCookieValue,
      product,
      lang: lang,
    });

    if (data && data.code === 200) {
      if (cookieObject) {
        context.$prestashop.config.app.$cookies.set(vsfCookieKey, cookieObject.vsfPsKeyCookie);
        context.$prestashop.config.app.$cookies.set(vsfCookieValue, cookieObject.vsfPsValCookie);
      }

      //// delete product from the local wishlist
      if (currentWishlist != undefined && currentWishlist.psdata.products != undefined) {
        currentWishlist.psdata.products.forEach(function (item, index) {
          if (item.id_product == product.id) {
            currentWishlist.psdata.products.splice(index, 1);
            return;
          }
        })
      }


      return currentWishlist;
    } else {
      // add to wishlist failed
      return {};
    }
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  clear: async (context: Context, {currentWishlist}) => {
    console.log('Mocked: useWishlist.clear');
    return {};
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isInWishlist: (context: Context, {currentWishlist, product}) => {
    /// check is the product added to the
    let value = false;
    if (currentWishlist != undefined && currentWishlist.psdata.products != undefined) {
      currentWishlist.psdata.products.forEach(function (item, index) {
        if (item.id_product == (product as any).id) {
          value = true;
        }
      })
    }
    return value;
  }
};

export const useWishlist = useWishlistFactory<Wishlist, WishlistItem, Product>(params);
