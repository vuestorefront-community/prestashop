// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
import {WishlistItem} from "@vue-storefront/prestashop-api/lib/types";

const populateWishlistItems = (wishlistItems: Array<any>):WishlistItem[] => {
  return wishlistItems.map((wishlistItem) => ({
    id: wishlistItem.id_product,
    // productAttributeId: wishlistItem.id_product_attribute,
    // attributesArray: wishlistItem.attributes_array,
    name: wishlistItem.name,
    image: wishlistItem.cover.url,
    regularPrice: wishlistItem.regular_price_amount,
    discountPrice: wishlistItem.price_amount,
    reference: wishlistItem.reference
  }));
};

export default populateWishlistItems;
