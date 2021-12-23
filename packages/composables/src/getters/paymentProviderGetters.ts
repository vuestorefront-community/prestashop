
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { populatePaymentProvidersList } from '../helpers';

function getPaymentProvidersList(paymentProviders:any[]): any[] {
  if (!paymentProviders) {
    return [];
  }
  return populatePaymentProvidersList(paymentProviders);
}

export const paymentProviderGetters = {
  getPaymentProvidersList
};
