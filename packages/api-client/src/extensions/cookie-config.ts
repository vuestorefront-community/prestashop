import { ApiClientExtension, Logger } from '@vue-storefront/core';
import type { Request, Response } from 'express';
import { parse as parseCookie } from 'cookie';

function parseSetCookies(cookies) {
  return cookies
    .map(cookie => cookie.split(';')[0])
    .reduce((obj, cookie) => ({
      ...obj,
      ...parseCookie(cookie)
    }), {});
}

function serializeCookies(cookies) {
  return Object
    .entries(cookies)
    .map(([name, value]) => `${name}=${encodeURIComponent(value as string)}`)
    .join('; ');
}

function mergeSetCookies(oldCookies, newCookies) {
  const cookies = new Map();

  function add(setCookie) {
    const cookie = setCookie.split(';')[0];
    const name = Object.keys(parseCookie(cookie))[0];

    cookies.set(name, cookie);
  }

  oldCookies.forEach(add);
  newCookies.forEach(add);

  return [...cookies.values()];
}

const cookieConfig: ApiClientExtension = {
  name: 'cookieConfig',
  hooks: (req: Request, res: Response) => ({
    beforeCreate({ configuration }) {
      // const psCookieKey = await context.$prestashop.config.app.$cookies.get(await context.$prestashop.config.app.$config.psCustomerCookieKey);
      // const cookie = request.cookies.foo || 'default';
      // const cookieConfiguration = loadCookieConfiguration(cookie);
      console.log('#### configuration');
      console.log(configuration);
      console.log('#### REQ.HEADER');
      console.log(req.headers);
      console.log('#### REQ.HEADER.COOKIE');
      console.log(req.headers.cookie);
      console.log('#### COOKIE');
      console.log(req.cookies);
      console.log('#### CSRF');
      console.log(req.headers['x-csrf-token']);
      console.log('#### MST');
      console.log(req.headers.moquisessiontoken);
      return {
        ...configuration,
        // 'X-CSRF-Token': req.headers['x-csrf-token'],
        moquisessiontoken: req.headers.moquisessiontoken,
        'request-host': req.headers.host
        // ...cookieConfiguration
      };
    },

    // beforeCreate: ({ configuration }) => ({
    //   ...configuration,
    //   auth: req.headers.cookie,
    //   'resquest-host': req.headers.host
    // }),
    beforeCall: ({ configuration, callName, args }) => args,
    afterCall: ({ configuration, callName, response }) => {
      try {
        console.log('------');
        console.log(callName);
        console.log('response');
        console.log(response);
        // const setCookies = response.headers?.['set-cookie'] || response.headers?.['Set-Cookie'];
        // console.log('#### SET-COCK');
        // console.log(setCookies);
        // console.log('#### RES.HEADERS');
        // console.log(res.getHeaders());
        // console.log('#### HEADERS');
        // console.log(response.headers);
        // console.log('#### RESPONSE');
        // console.log(response);
        // if (setCookies) {
        //   console.log('#### 1');

        //   // Combine the cookies set on axios with the new cookies and serialize them
        //   const cookie = serializeCookies({
        //     // ...parseCookie(configuration.authCookie),
        //     ...parseSetCookies(setCookies)
        //   });
        //   console.log('#### 2');

        //   configuration.authCookie = cookie; // eslint-disable-line no-param-reassign
        //   // $axios.defaults.headers.common.cookie = cookie; // eslint-disable-line no-param-reassign
        //   console.log('#### 3');

        //   // If the res already has a Set-Cookie header it should be merged
        //   if (res.getHeader('Set-Cookie')) {
        //     console.log('#### 4');

        //     const newCookies = mergeSetCookies(
        //       res.getHeader('Set-Cookie'),
        //       setCookies
        //     );
        //     console.log('#### 5');
        //     res.setHeader('Set-Cookie', newCookies);

        //     // res.headers['Set-Cookie'] = newCookies;
        //     console.log('#### 6');

        //   } else {
        //     res.setHeader('Set-Cookie', setCookies);
        //     // res.headers['Set-Cookie'] = setCookies;

        //     // res.set('Set-Cookie', setCookies);
        //     console.log('#### 7');

        //   }
        // }

        // console.log('#### RESPONSE.DAYA');
        // console.log(JSON.stringify(response?.data));

        // console.log('#### RESPONSE.HEADERS');
        // console.log(JSON.stringify(response?.headers));

        // console.log('#### RES.HEADERS');
        // console.log(JSON.stringify(res.getHeaders()));
        // // console.log('#### RESPONSE.HEADERS.XSRF');
        // // console.log(response.headers?.['x-csrf-token']);

        // // console.log('#### RESPONSE.HEADERS.moquisessiontoken');
        // // console.log(response.headers?.moquisessiontoken);

        // // if (res.headers['x-csrf-token']) {
        // //   res.set('x-csrf-token', res.headers['x-csrf-token']);
        // // }

        // // if (res.headers.moquisessiontoken) {
        // //   res.set('moquisessiontoken', res.headers.moquisessiontoken);
        // // }

        // // if (res.headers['set-cookie']) {
        // //   console.log("#### res.headers['set-cookie']")
        // //   console.log(res.headers['set-cookie'])
        // //   res.set('Set-cookie', res.headers['set-cookie']);
        // // }
        // console.log('------');

        // return response;
        console.log('response')
        if (res.getHeaders()) {
          Logger.warn('res.getHeaders()');
          Logger.warn(res.getHeaders());
          Logger.warn('res.getHeaders()[\'set-cookie\']');
          Logger.warn(res.getHeaders()?.['set-cookie']);
          Logger.warn('res.getHeaders()[\'set-cookie\'][0]');
          Logger.warn(res.getHeaders()?.['set-cookie']?.[0]);
        }
        if (response.headers) {
          Logger.warn('response.headers');
          Logger.warn(response.headers);
          Logger.warn('response.headers[\'set-cookie\']');
          Logger.warn(response.headers?.['set-cookie']);
          Logger.warn('response.headers[\'set-cookie\'][0]');
          Logger.warn(response.headers?.['set-cookie']?.[0]);

          res.setHeader('Set-cookie', response.headers['set-cookie'])
        }

        return response
      } catch (err) {
        Logger.error('afterCreate:::: ', err);
      }
    }

  })
};

export default cookieConfig;
