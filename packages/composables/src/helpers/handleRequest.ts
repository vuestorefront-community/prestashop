import { useVSFContext, Logger } from '@vue-storefront/core';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const handleRequest = async (context, params) => {
  // const {method, url, request} = params;
  const _context = context ? context : useVSFContext();

  // Logger.error('_context.$prestashop.config.app.$cookies: ' + JSON.stringify(await _context.$prestashop.config.app.$cookies.get(await _context.$prestashop.config.app.$config.psCustomerCookieKey)));

  const isSSR: boolean = process.server;
  console.log('_context.$prestashop ' + JSON.stringify(typeof _context.$prestashop));
  console.log('_context.$prestashop.config.app.$cookies ' + JSON.stringify(typeof _context.$prestashop.config.app.$cookies));

  const psCookieKey = _context.$prestashop.config.app.$cookies.get(await _context.$prestashop.config.app.$config.psCustomerCookieKey);
  const psCookieValue = _context.$prestashop.config.app.$cookies.get(await _context.$prestashop.config.app.$config.psCustomerCookieValue);
  const moquiSessionToken = _context.$prestashop.config.app.$cookies.get('moquiSessionToken');

  // console.log('typeof _context.$prestashop.client.defaults.headers: ' + JSON.stringify(_context.$prestashop.client.defaults.headers));

  // Logger.error(typeof request);
  if (psCookieValue && moquiSessionToken) {
    params.headers = {
      Cookie: psCookieKey + '=' + psCookieValue + ';',
      moquiSessionToken: moquiSessionToken
    };
  }
  try {
    // Logger.error(JSON.stringify(params.url) + ' _context.$prestashop.settings ' + JSON.stringify(_context.$prestashop.settings));
    // Logger.error(JSON.stringify(params.url) + ' _context.$prestashop.cookies ' + JSON.stringify(_context.$prestashop.cookies));
    // Logger.error(JSON.stringify(params.url) + ' _context.$prestashop.api ' + JSON.stringify(_context.$prestashop.api));
    // Logger.error(JSON.stringify(params.url) + ' _context.$prestashop.client ' + JSON.stringify(_context.$prestashop.client));
    // Logger.error(JSON.stringify(params.url) + ' _context.$prestashop.config.app ' + JSON.stringify(_context.$prestashop.config.app));
    // Logger.error(JSON.stringify(params.url) + ' _context.$prestashop.api ' + JSON.stringify(_context.$prestashop.api));

    Logger.error(JSON.stringify(params.url) + ' params.headers: ' + JSON.stringify(params.headers));
    const {data, headers, cookieObject} = await _context.$prestashop.api.bootstrap(params);
    Logger.error(JSON.stringify(params.url) + ' headers: ' + JSON.stringify(headers));

    Logger.error(JSON.stringify(params.url) + ' handleRequest data: ' + JSON.stringify(data));

    if (cookieObject) {
      const psCookieKeyNew = cookieObject?.vsfPsKeyCookie;
      if (psCookieKeyNew && psCookieKeyNew !== psCookieKey) {
        await _context.$prestashop.config.app.$cookies.set(await _context.$prestashop.config.app.$config.psCustomerCookieKey, psCookieKeyNew);
        // Logger.error(JSON.stringify(params.url) + ' psCookieKeyNew: ' + JSON.stringify(psCookieKeyNew));
        // Logger.error(JSON.stringify(params.url) + ' await _context.$prestashop.config.app.$cookies.get(await _context.$prestashop.config.app.$config.psCustomerCookieKey)'
        //   + JSON.stringify(await _context.$prestashop.config.app.$cookies.get(await _context.$prestashop.config.app.$config.psCustomerCookieKey)));

        // console.assert(psCookieKeyNew === _context.$prestashop.config.app.$cookies.get(_context.$prestashop.config.app.$config.psCustomerCookieKey));
      }
      const psCookieValueNew = cookieObject?.vsfPsValCookie;
      if (psCookieValueNew && psCookieValueNew !== psCookieValue) {
        await _context.$prestashop.config.app.$cookies.set(await _context.$prestashop.config.app.$config.psCustomerCookieValue, psCookieValueNew);
        // Logger.error(JSON.stringify(params.url) + ' psCookieValueNew: ' + JSON.stringify(psCookieValueNew));
        // Logger.error(JSON.stringify(params.url) + ' await _context.$prestashop.config.app.$cookies.get(await _context.$prestashop.config.app.$config.psCustomerCookieValue); '
        //   + JSON.stringify(await _context.$prestashop.config.app.$cookies.get(await _context.$prestashop.config.app.$config.psCustomerCookieValue)));

        // console.assert(psCookieValueNew === _context.$prestashop.config.app.$cookies.get(_context.$prestashop.config.app.$config.psCustomerCookieValue));
      }
    }
    if (headers) {
      const moquiSessionTokenNew = headers.moquisessiontoken ? headers.moquisessiontoken : headers['x-csrf-token'];
      if (moquiSessionTokenNew && moquiSessionTokenNew !== moquiSessionToken) {
        await _context.$prestashop.config.app.$cookies.set('moquiSessionToken', moquiSessionTokenNew);
        Logger.error('isSSR: ' + JSON.stringify(process.server) + ' at ' + JSON.stringify(params.url) + ' moquiSessionTokenNew: ' + JSON.stringify(moquiSessionTokenNew));
        // const moquiSessionTokenNewNew = await _context.$prestashop.config.app.$cookies.get('moquiSessionToken');
        Logger.error('isSSR: ' + JSON.stringify(process.server) + ' at ' + JSON.stringify(params.url) + ' moquiSessionTokenNewNew: ' + JSON.stringify(await _context.$prestashop.config.app.$cookies.get('moquiSessionToken')));
      }
    }

    return data;

  } catch (err) {
    Logger.error('isSSR: ' + JSON.stringify(process.server) + ' at ' + JSON.stringify(params.url) + ' handleRequest: ', err);
  }

};

export default handleRequest;
