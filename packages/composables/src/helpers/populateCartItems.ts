// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const populateCartItems = (cartItems: Array<any>) => {
  const populateCartItems = cartItems.map((cartItem) => ({
    id: cartItem.id_product,
    name: cartItem.name,
    image: cartItem.image_url,
    regularPrice: cartItem.price_without_reduction,
    discountPrice: cartItem.price,
    quantity: cartItem.cart_quantity,
    reference: cartItem.reference
  }));

  return populateCartItems;
};

export default populateCartItems;
