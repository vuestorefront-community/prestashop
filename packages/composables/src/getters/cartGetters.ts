import {
  CartGetters,
  AgnosticPrice,
  AgnosticTotals,
  AgnosticCoupon,
  AgnosticDiscount
} from '@vue-storefront/core';
import type { Cart, CartItem } from '@vue-storefront/prestashop-api';
import { populateCartItems } from '../helpers';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItems (cart: Cart): CartItem[] {
  console.log(cart.psdata.products);
  return populateCartItems(cart.psdata.products);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItemName(item: CartItem): string {
  return item.name;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItemImage(item: CartItem): string {
  return item.image;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItemPrice(item: CartItem): AgnosticPrice {
  return {
    regular: item.regularPrice,
    special: item.discountPrice
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItemQty(item: CartItem): number {
  return item.quantity;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItemAttributes(item: CartItem, filterByAttributeName?: Array<string>):any {
  console.log(item);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return item.attributesArray;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItemSku(item: CartItem): string {
  return item.reference;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getTotals(cart: Cart): AgnosticTotals {
  if (cart) {
    const products = cart.psdata.products;
    let regularPrice = 0;
    let discountPrice = 0;
    for (const item of products) {
      regularPrice += item.price_without_reduction;
      discountPrice += item.price;
    }
    return {
      total: regularPrice,
      subtotal: regularPrice,
      special: discountPrice
    };
  } else {
    return {subtotal: 0, total: 0};
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getShippingPrice(cart: Cart): number {
  return 0;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getTotalItems(cart: Cart): number {
  if (cart) {
    let sum = 0;
    for (const cartElement of cart.psdata.products) {
      sum += parseInt(cartElement.cart_quantity);
    }

    return sum;
  }
  return 0;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getFormattedPrice(price: number): string {
  return '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getCoupons(cart: Cart): AgnosticCoupon[] {
  return [];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getDiscounts(cart: Cart): AgnosticDiscount[] {
  return [];
}

export const cartGetters: CartGetters<Cart, CartItem> = {
  getTotals,
  getShippingPrice,
  getItems,
  getItemName,
  getItemImage,
  getItemPrice,
  getItemQty,
  getItemAttributes,
  getItemSku,
  getFormattedPrice,
  getTotalItems,
  getCoupons,
  getDiscounts
};
