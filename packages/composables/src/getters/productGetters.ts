import {
  AgnosticMediaGalleryItem,
  AgnosticAttribute,
  AgnosticPrice,
  ProductGetters
} from '@vue-storefront/core';
import type { PsProduct, ProductFilter } from '@vue-storefront/prestashop-api';
import { populateFeaturedProducts, populateProducts } from '../helpers';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getName(product: PsProduct): string {
  return product?.name || '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getSlug(product: PsProduct): string {
  if (product)
    return product.slug;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getPrice(product: PsProduct): AgnosticPrice {
  return {
    regular: product?.regularPrice || 0,
    special: product?.discountPrice || 0
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getGallery(product: PsProduct): AgnosticMediaGalleryItem[] {
  return product?.images || [];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getCoverImage(product: PsProduct): string {
  if (product)
    return product.coverImageMedium;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getFiltered(products: PsProduct[], filters: ProductFilter): PsProduct[] {
  if (!products) {
    return [];
  }
  products = Array.isArray(products) ? products : [products];
  return populateProducts(products);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/explicit-module-boundary-types
function getFeaturedProductsFiltered(products, filters: ProductFilter): PsProduct[] {
  if (!products) {
    return [];
  }
  products = Array.isArray(products) ? products : [products];
  return populateFeaturedProducts(products);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/explicit-module-boundary-types
function getAttributes(products) {
  return products?.groups;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getDescription(product: PsProduct): any {
  return product?.description || '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getShortDescription(product: PsProduct): any {
  return product?.shortDescription || '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getBrand(product: PsProduct): any {
  return product?.brand || '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getCategory(product: PsProduct): any {
  return product?.category || '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getProductInfo(product: PsProduct): any {
  return product?.productInfo || '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getCategoryIds(product: PsProduct): string[] {
  return [];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getId(product: PsProduct): string {
  return product.id;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getFormattedPrice(price: number): string {
  return '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getTotalReviews(product: PsProduct): number {
  return 0;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getAverageRating(product: PsProduct): number {
  return 0;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getQuantity(product: PsProduct): any {
  return product?.quantity || 0;
}

export const productGetters: ProductGetters<PsProduct, ProductFilter> = {
  getName,
  getSlug,
  getPrice,
  getGallery,
  getCoverImage,
  getFiltered,
  getFeaturedProductsFiltered,
  getAttributes,
  getDescription,
  getCategoryIds,
  getId,
  getFormattedPrice,
  getTotalReviews,
  getAverageRating,
  getShortDescription,
  getBrand,
  getCategory,
  getProductInfo,
  getQuantity
};
