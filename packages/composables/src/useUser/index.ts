import {
  Context,
  useUserFactory,
  UseUserFactoryParams
} from '@vue-storefront/core';
import type { User } from '@vue-storefront/prestashop-api';
import type {
  UseUserUpdateParams as UpdateParams,
  UseUserRegisterParams as RegisterParams
} from '../types';

const params: UseUserFactoryParams<User, UpdateParams, RegisterParams> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context) => {
    const cookieKey = context.$prestashop.config.app.$config.psCustomerCookieKey;
    const cookieValue = context.$prestashop.config.app.$config.psCustomerCookieValue;

    const key = context.$prestashop.config.app.$cookies.get(cookieKey);
    const value = context.$prestashop.config.app.$cookies.get(cookieValue);
    if (key && value) {
      const result: any = await context.$prestashop.api.loadCustomer({key, value});
      if (result.code === 410) {
        return null;
      }
    } else {
      return null;
    }

    // todo: setup User type
    return {};
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  logOut: async (context: Context) => {
    const cookieKey = context.$prestashop.config.app.$config.psCustomerCookieKey;
    const cookieValue = context.$prestashop.config.app.$config.psCustomerCookieValue;

    const key = context.$prestashop.config.app.$cookies.get(cookieKey);
    const value = context.$prestashop.config.app.$cookies.get(cookieValue);

    context.$prestashop.config.app.$cookies.remove(cookieKey);
    context.$prestashop.config.app.$cookies.remove(cookieValue);

    // todo: call logout api
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateUser: async (context: Context, { currentUser, updatedUserData }) => {
    console.log('Mocked: useUser.updateUser');
    return {};
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  register: async (context: Context, { email, password, firstName, lastName }) => {
    const {data, cookieObject} = await context.$prestashop.api.login({email, password, firstName, lastName});

    const cookieKey = context.$prestashop.config.app.$config.psCustomerCookieKey;
    const cookieValue = context.$prestashop.config.app.$config.psCustomerCookieValue;
    const code = data.code;

    if (code === 200) {
      context.$prestashop.config.app.$cookies.set(cookieKey, cookieObject.vsfPsKeyCookie);
      context.$prestashop.config.app.$cookies.set(cookieValue, cookieObject.vsfPsValCookie);

    } else if (code === 306) {
      // authentication failed
    }

    return {};
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  logIn: async (context: Context, { username, password }) => {
    const vsfCookieKey = context.$prestashop.config.app.$config.psCustomerCookieKey;
    const vsfCookieValue = context.$prestashop.config.app.$config.psCustomerCookieValue;

    const psCookieKey = context.$prestashop.config.app.$cookies.get(vsfCookieKey);
    const psCookieValue = context.$prestashop.config.app.$cookies.get(vsfCookieValue);

    const {data, cookieObject} = await context.$prestashop.api.login({username, password, psCookieKey, psCookieValue});
    const code = data.code;

    if (code === 200) {
      context.$prestashop.config.app.$cookies.set(vsfCookieKey, cookieObject.vsfPsKeyCookie);
      context.$prestashop.config.app.$cookies.set(vsfCookieValue, cookieObject.vsfPsValCookie);

    } else if (code === 306) {
      // authentication failed
    }

    return {};
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  changePassword: async (context: Context, { currentUser, currentPassword, newPassword }) => {
    console.log('Mocked: useUser.changePassword');
    return {};
  }
};

export const useUser = useUserFactory<User, UpdateParams, RegisterParams>(params);
