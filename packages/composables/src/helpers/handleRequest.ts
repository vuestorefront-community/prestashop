import { computed } from '@nuxtjs/composition-api';
import { sharedRef, useVSFContext, Logger } from '@vue-storefront/core';
import populateAddressesList from './populateAddressesList';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const handleRequest = async (params) => {
  // const {method, url, request} = params;
  const context = useVSFContext();

  const psCookieKey = await context.$prestashop.config.app.$cookies.get(await context.$prestashop.config.app.$config.psCustomerCookieKey);
  const psCookieValue = await context.$prestashop.config.app.$cookies.get(await context.$prestashop.config.app.$config.psCustomerCookieValue);
  let moquiSessionToken = await context.$prestashop.config.app.$cookies.get('moquiSessionToken');

  // Logger.error(typeof request);
  if (psCookieValue && moquiSessionToken) {
    params.headers = {
      Cookie: psCookieKey + '=' + psCookieValue + ';',
      moquiSessionToken: moquiSessionToken
    };
  }
  try {
    // Logger.error(JSON.stringify(params.url) + ' context.$prestashop.settings ' + JSON.stringify(context.$prestashop.settings));
    // Logger.error(JSON.stringify(params.url) + ' context.$prestashop.cookies ' + JSON.stringify(context.$prestashop.cookies));
    // Logger.error(JSON.stringify(params.url) + ' context.$prestashop.api ' + JSON.stringify(context.$prestashop.api));
    // Logger.error(JSON.stringify(params.url) + ' context.$prestashop.client ' + JSON.stringify(context.$prestashop.client));
    // Logger.error(JSON.stringify(params.url) + ' context.$prestashop.config.app ' + JSON.stringify(context.$prestashop.config.app));
    // Logger.error(JSON.stringify(params.url) + ' context.$prestashop.api ' + JSON.stringify(context.$prestashop.api));

    Logger.error(JSON.stringify(params.url) + ' params.headers: ' + JSON.stringify(params.headers));
    const {data, headers, cookieObject} = await context.$prestashop.api.bootstrap(params);
    Logger.error(JSON.stringify(params.url) + ' headers: ' + JSON.stringify(headers));

    // Logger.error('handleRequest data: ' + JSON.stringify(data));

    // if (cookieObject) {
    //   const psCookieKeyNew = cookieObject?.vsfPsKeyCookie;
    //   if (psCookieKeyNew && psCookieKeyNew !== psCookieKey) {
    //     await context.$prestashop.config.app.$cookies.set(await context.$prestashop.config.app.$config.psCustomerCookieKey, psCookieKeyNew);
    //     // Logger.error(JSON.stringify(params.url) + ' psCookieKeyNew: ' + JSON.stringify(psCookieKeyNew));
    //     // Logger.error(JSON.stringify(params.url) + ' await context.$prestashop.config.app.$cookies.get(await context.$prestashop.config.app.$config.psCustomerCookieKey)'
    //     //   + JSON.stringify(await context.$prestashop.config.app.$cookies.get(await context.$prestashop.config.app.$config.psCustomerCookieKey)));
    //
    //     // console.assert(psCookieKeyNew === context.$prestashop.config.app.$cookies.get(context.$prestashop.config.app.$config.psCustomerCookieKey));
    //   }
    //   const psCookieValueNew = cookieObject?.vsfPsValCookie;
    //   if (psCookieValueNew && psCookieValueNew !== psCookieValue) {
    //     await context.$prestashop.config.app.$cookies.set(await context.$prestashop.config.app.$config.psCustomerCookieValue, psCookieValueNew);
    //     // Logger.error(JSON.stringify(params.url) + ' psCookieValueNew: ' + JSON.stringify(psCookieValueNew));
    //     // Logger.error(JSON.stringify(params.url) + ' await context.$prestashop.config.app.$cookies.get(await context.$prestashop.config.app.$config.psCustomerCookieValue); '
    //     //   + JSON.stringify(await context.$prestashop.config.app.$cookies.get(await context.$prestashop.config.app.$config.psCustomerCookieValue)));
    //
    //     // console.assert(psCookieValueNew === context.$prestashop.config.app.$cookies.get(context.$prestashop.config.app.$config.psCustomerCookieValue));
    //   }
    // }
    if (headers) {
      const moquiSessionTokenNew = headers['moquisessiontoken'] ? headers['moquisessiontoken'] : headers['x-csrf-token'];
      if (moquiSessionTokenNew && moquiSessionTokenNew !== moquiSessionToken) {
        await context.$prestashop.config.app.$cookies.set('moquiSessionToken', moquiSessionTokenNew);
        Logger.error(JSON.stringify(params.url) + ' moquiSessionTokenNew: ' + JSON.stringify(moquiSessionTokenNew));
        const moquiSessionTokenNewNew = await context.$prestashop.config.app.$cookies.get('moquiSessionToken');
        Logger.error(JSON.stringify(params.url) + ' moquiSessionTokenNewNew: ' + JSON.stringify(moquiSessionTokenNewNew));

        Logger.error(JSON.stringify(params.url) + ' moquiSessionTokenNew === context.$prestashop.config.app.$cookies.get(\'moquiSessionToken\'): ' + JSON.stringify(moquiSessionTokenNew === await context.$prestashop.config.app.$cookies.get('moquiSessionToken')) );
        Logger.error(JSON.stringify(params.url) + ' moquiSessionTokenNew === moquiSessionTokenNewNew ' + JSON.stringify(moquiSessionTokenNew === moquiSessionTokenNewNew) );

        Logger.error(JSON.stringify(params.url) + ' await context.$prestashop.config.app.$cookies.get(\'moquiSessionToken\'); '
          + JSON.stringify(await context.$prestashop.config.app.$cookies.get('moquiSessionToken')) );

        // console.assert(moquiSessionTokenNew === context.$prestashop.config.app.$cookies.get('moquiSessionToken'), "moquiSessionTokenNew !== context.$prestashop.config.app.$cookies.get('moquiSessionToken')");
      }
    }

    return data;

  } catch (err) {
    Logger.error('handleRequest', err);
  }

};

export default handleRequest;
