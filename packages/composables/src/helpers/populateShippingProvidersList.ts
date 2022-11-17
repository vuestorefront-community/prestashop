// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const populateShippingProvidersList = (shippingProviders) => {
  const shippingsArr = JSON.parse(JSON.stringify(shippingProviders));
  const populatedShippingProvidersList = [];
  for (const id in shippingsArr) {
    const provider = shippingsArr[id];
    const features = {
      id: provider.id,
      label: provider.label,
      value: provider.id + ',',
      description: provider.delay
    };
    populatedShippingProvidersList.push(features);
  }
  return populatedShippingProvidersList;
};
export default populateShippingProvidersList;
