import { AgnosticMediaGalleryItem } from '@vue-storefront/core';

export type TODO = unknown;

export type Setttings = TODO;

export type Endpoints = TODO;

export type BillingAddress = TODO;

export type Cart = any;

export type CartItem = {
    id: string;
    productAttributeId: string;
    name: string;
    image: string;
    regularPrice: number;
    discountPrice: number;
    quantity: number;
    reference: string;
};

export type Category = TODO;

export type Coupon = TODO;

export type Facet = TODO;

export type FacetSearchCriteria = TODO;

export type Order = TODO;

export type OrderItem = TODO;

export type PasswordResetResult = TODO;

export type Product = TODO;

export type PsProduct = {
    id: string;
    name: string;
    slug: string;
    regularPrice: number;
    discountPrice: number;
    coverImageSmall: string;
    coverImageMedium: string;
    coverImageLarge: string;
    images: AgnosticMediaGalleryItem[];
    quantity: number;
    description: any;
    shortDescription: any;
    brand: string;
    category: string;
    productInfo: any;
}

export type ProductFilter = TODO;

export type Review = TODO;

export type ReviewItem = TODO;

export type User = TODO;

export type UserBillingAddress = TODO;

export type UserBillingAddressItem = TODO;

export type UserBillingAddressSearchCriteria = TODO;

export type UserShippingAddress = TODO;

export type UserShippingAddressItem = TODO;

export type UserShippingAddressSearchCriteria = TODO;

export type ShippingAddress = TODO;

export type ShippingMethod = TODO;

export type ShippingProvider = TODO;

export type Store = TODO;

export type Wishlist = TODO;

export type WishlistItem = TODO;
