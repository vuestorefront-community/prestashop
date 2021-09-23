// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
import { AgnosticMediaGalleryItem } from '@vue-storefront/core';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const populateProducts = (psProducts: Array<any>) => {
  const populateProducts = psProducts.map((product) => ({
    id: product.id_product,
    name: product.name,
    slug: 'todo-back',
    regularPrice: product.float_price,
    // eslint-disable-next-line line-comment-position
    discountPrice: product.float_price, // todo
    coverImageSmall: product.cover_image,
    coverImageMedium: product.cover_image,
    coverImageLarge: product.cover_image,
    images: product.images.map(
      (image)=>(<AgnosticMediaGalleryItem>{
        small: image.src,
        normal: image.src,
        big: image.src
      }
      )),
    description: product.description,
    shortDescription: product.description_short,
    brand: product.manufacturer_name,
    category: product.category_name,
    productInfo: product.product_info
  }));

  return populateProducts;
};

export default populateProducts;
