
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { populateShippingProvidersList } from '../helpers';

function getShippingProvidersList(shippingProviders:any[]): any[] {
  if (!shippingProviders) {
    return [];
  }
  return populateShippingProvidersList(shippingProviders);
}

export const shippingProviderGetters = {
  getShippingProvidersList
};
