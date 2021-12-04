// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const populateOrderDetails = (details) => {
  const orderDetails = { products: [] };
  const products = JSON.parse(JSON.stringify(details.products));
  for (const id in products) {
    const product = products[id];
    const features = {
      id: product.id_product,
      name: product.product_name,
      quantity: product.quantity,
      price: Number(product.product_price),
      slug: product.link_rewrite
    };
    orderDetails.products.push(features);
  }
  return orderDetails;
};

export default populateOrderDetails;
