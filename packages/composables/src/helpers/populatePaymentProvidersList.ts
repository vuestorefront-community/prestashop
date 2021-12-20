// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const populatePaymentProvidersList = (paymentProviders) => {
  const paymentsArr = JSON.parse(JSON.stringify(paymentProviders));
  console.log('paymentsarr', paymentsArr);
  const populatedShippingProvidersList = [];
  for (const id in paymentsArr) {
    let provider = paymentsArr[id];
    if (provider[0]) {
      provider = provider[0];
    }
    const features = {
      id: provider.id,
      label: provider.call_to_action_text,
      value: provider.id,
      description: ''
    };
    populatedShippingProvidersList.push(features);
  }
  return populatedShippingProvidersList;
};
export default populatePaymentProvidersList;
