import {
  Context, Logger,
  useUserFactory,
  UseUserFactoryParams
} from '@vue-storefront/core';
import type { User } from '@vue-storefront/prestashop-api';
import type {
  UseUserUpdateParams as UpdateParams,
  UseUserRegisterParams as RegisterParams
} from '../types';
import {handleRequest} from '../helpers';

const params: UseUserFactoryParams<User, UpdateParams, RegisterParams> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context) => {
    const result: any = await handleRequest({method: 'get', url: '/accountInfo'});

    if (result?.code === 410) {
      return null;
    }
    return result?.psdata;

    // todo: setup User type
    return {};
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  logOut: async (context: Context) => {
    const cookieKey = context.$prestashop.config.app.$config.psCustomerCookieKey;
    const cookieValue = context.$prestashop.config.app.$config.psCustomerCookieValue;

    context.$prestashop.config.app.$cookies.remove(cookieKey);
    context.$prestashop.config.app.$cookies.remove(cookieValue);

    // todo: call logout api
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateUser: async (context: Context, { currentUser, updatedUserData }) => {
    const vsfCookieKey = context.$prestashop.config.app.$config.psCustomerCookieKey;
    const vsfCookieValue = context.$prestashop.config.app.$config.psCustomerCookieValue;

    const psCookieKey = await context.$prestashop.config.app.$cookies.get(vsfCookieKey);
    const psCookieValue = await context.$prestashop.config.app.$cookies.get(vsfCookieValue);
    const moquiSessionToken = await context.$prestashop.config.app.$cookies.get('moquiSessionToken');

    console.log("updateUser moquiSessionToken " + JSON.stringify(moquiSessionToken));

    const { data, cookieObject } = await context.$prestashop.api.updateCustomer({ psCookieKey, psCookieValue, updatedUserData, moquiSessionToken });

    if (data.success) {
      if (cookieObject) {
        await context.$prestashop.config.app.$cookies.set(vsfCookieKey, cookieObject.vsfPsKeyCookie);
        await context.$prestashop.config.app.$cookies.set(vsfCookieValue, cookieObject.vsfPsValCookie);
      }
      const cookieKey = context.$prestashop.config.app.$config.psCustomerCookieKey;
      const cookieValue = context.$prestashop.config.app.$config.psCustomerCookieValue;

      const key = await context.$prestashop.config.app.$cookies.get(cookieKey);
      const value = await context.$prestashop.config.app.$cookies.get(cookieValue);
      if (key && value) {
        const result: any = await context.$prestashop.api.loadCustomer({key, value});
        return result.psdata;
      }
    }
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  register: async (context: Context, { email, password, firstName, lastName }) => {
    const vsfCookieKey = context.$prestashop.config.app.$config.psCustomerCookieKey;
    const vsfCookieValue = context.$prestashop.config.app.$config.psCustomerCookieValue;

    const psCookieKey = await context.$prestashop.config.app.$cookies.get(vsfCookieKey);
    const psCookieValue = await context.$prestashop.config.app.$cookies.get(vsfCookieValue);

    Logger.error("user 1 context.$prestashop.config.app.$cookies.get('moquiSessionToken');"+JSON.stringify(await context.$prestashop.config.app.$cookies.get('moquiSessionToken')));

    let moquiSessionToken = await context.$prestashop.config.app.$cookies.get('moquiSessionToken');

    const {data, headers, cookieObject} = await context.$prestashop.api.register({email, password, firstName, lastName, psCookieKey, psCookieValue, moquiSessionToken});
    const code = data?.code;

    Logger.error("user headers['moquisessiontoken']: "+JSON.stringify(headers['moquisessiontoken']));

    Logger.error("user 2 context.$prestashop.config.app.$cookies.get('moquiSessionToken'): "+JSON.stringify(await context.$prestashop.config.app.$cookies.get('moquiSessionToken')));

    if (code === 200) {
      await context.$prestashop.config.app.$cookies.set(vsfCookieKey, cookieObject.vsfPsKeyCookie);
      await context.$prestashop.config.app.$cookies.set(vsfCookieValue, cookieObject.vsfPsValCookie);
      moquiSessionToken = headers['moquisessiontoken'] ? headers['moquisessiontoken'] : headers['x-csrf-token'];
      await context.$prestashop.config.app.$cookies.set('moquiSessionToken', moquiSessionToken);

      const result: any = await context.$prestashop.api.loadCustomer({key: cookieObject.vsfPsKeyCookie, value: cookieObject.vsfPsValCookie, moquiSessionToken});

      if (result.code === 410) {
        return {};
      }
      return result.psdata;

    } else if (code === 306) {
      throw {
        message: 'Registration failed'
      };
    }

    return {};
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  logIn: async (context: Context, { username, password }) => {
    const vsfCookieKey = context.$prestashop.config.app.$config.psCustomerCookieKey;
    const vsfCookieValue = context.$prestashop.config.app.$config.psCustomerCookieValue;

    const psCookieKey = await context.$prestashop.config.app.$cookies.get(vsfCookieKey);
    const psCookieValue = await context.$prestashop.config.app.$cookies.get(vsfCookieValue);
    const moquiSessionToken = await context.$prestashop.config.app.$cookies.get('moquiSessionToken');

    const {data, cookieObject} = await context.$prestashop.api.login({username, password, psCookieKey, psCookieValue, moquiSessionToken});
    const code = data.code;

    if (code === 200) {
      if (cookieObject) {
        await context.$prestashop.config.app.$cookies.set(vsfCookieKey, cookieObject.vsfPsKeyCookie);
        await context.$prestashop.config.app.$cookies.set(vsfCookieValue, cookieObject.vsfPsValCookie);
      }
    } else if (code === 306) {
      throw {
        message: 'The provided credentials are invalid'
      };
    }

    return data.psdata.user;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  changePassword: async (context: Context, { currentUser, currentPassword, newPassword, customQuery }) => {
    const updatedUserData = {
      password: currentPassword,
      // eslint-disable-next-line camelcase
      new_password: newPassword,
      ...customQuery
    };
    const vsfCookieKey = context.$prestashop.config.app.$config.psCustomerCookieKey;
    const vsfCookieValue = context.$prestashop.config.app.$config.psCustomerCookieValue;

    const psCookieKey = await context.$prestashop.config.app.$cookies.get(vsfCookieKey);
    const psCookieValue = await context.$prestashop.config.app.$cookies.get(vsfCookieValue);
    const moquiSessionToken = await context.$prestashop.config.app.$cookies.get('moquiSessionToken');

    const { data, cookieObject } = await context.$prestashop.api.updateCustomer({ psCookieKey, psCookieValue, updatedUserData, moquiSessionToken });
    if (data.success) {
      if (cookieObject) {
        await context.$prestashop.config.app.$cookies.set(vsfCookieKey, cookieObject.vsfPsKeyCookie);
        await context.$prestashop.config.app.$cookies.set(vsfCookieValue, cookieObject.vsfPsValCookie);
      }
      const cookieKey = context.$prestashop.config.app.$config.psCustomerCookieKey;
      const cookieValue = context.$prestashop.config.app.$config.psCustomerCookieValue;

      const key = await context.$prestashop.config.app.$cookies.get(cookieKey);
      const value = await context.$prestashop.config.app.$cookies.get(cookieValue);
      if (key && value) {
        const result: any = await context.$prestashop.api.loadCustomer({key, value});
        return result.psdata;
      }
    }
  }
};

export const useUser = useUserFactory<User, UpdateParams, RegisterParams>(params);
