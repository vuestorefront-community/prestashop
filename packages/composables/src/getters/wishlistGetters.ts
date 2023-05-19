import {
  WishlistGetters,
  AgnosticAttribute,
  AgnosticPrice,
  AgnosticTotals
} from '@vue-storefront/core';
import type {Wishlist, WishlistItem} from '@vue-storefront/prestashop-api';
import {populateWishlistItems} from "../helpers";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItems(wishlist: Wishlist): WishlistItem[] {
  if (wishlist.psdata !== undefined)
    return populateWishlistItems(wishlist.psdata.products);
  else
    return [];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getTotals(wishlist: Wishlist): AgnosticTotals {
  return {
    total: 10,
    subtotal: 10
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItemName(item: WishlistItem): string {
  return item.name;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItemImage(item: WishlistItem): string {
  // console.log('333333333333')
  // console.log(JSON.stringify(item))
  return item.image;
  // return 'https://rest.binshops.com/21-home_default/brown-bear-printed-sweater.jpg';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItemPrice(item: WishlistItem): AgnosticPrice {
  return {
    regular: item.regularPrice,
    special: item.discountPrice
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItemAttributes(item: WishlistItem, filters?: string[]): Record<string, AgnosticAttribute | string> {
  return {
    color: item.reference
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItemSku(item: WishlistItem): string {
  return '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getTotalItems(wishlist: Wishlist): number {
  if (wishlist && wishlist.psdata) {
    return wishlist.psdata.products.length;
  }
  return 0;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getFormattedPrice(price: number): string {
  return '$' + price;
}

export const wishlistGetters: WishlistGetters<Wishlist, WishlistItem> = {
  getItems,
  getTotals,
  getItemName,
  getItemImage,
  getItemPrice,
  getItemAttributes,
  getItemSku,
  getTotalItems,
  getFormattedPrice,
};
