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
    const result: any = await handleRequest(context, {method: 'get', url: '/accountInfo'});

    if (result?.code === 410) {
      return null;
    }
    return result?.psdata;

    // todo: setup User type
    return {};
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  logOut: async (context: Context) => {
    context.$prestashop.config.app.$cookies.remove(context.$prestashop.config.app.$config.psCustomerCookieKey);
    context.$prestashop.config.app.$cookies.remove(context.$prestashop.config.app.$config.psCustomerCookieValue);
    context.$prestashop.config.app.$cookies.remove('moquiSessionToken');

    // todo: call logout api
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateUser: async (context: Context, { currentUser, updatedUserData }) => {
    const data = await handleRequest(context, {method: 'post',
      url: '/accountedit',
      data: updatedUserData
    });

    if (data.success) {
      const result: any = await handleRequest(context, {method: 'get', url: '/accountInfo'});

      return result.psdata;
    }
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  register: async (context: Context, { email, password, firstName, lastName }) => {
    const data = await handleRequest(context, {method: 'post',
      url: '/register',
      data: {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName
      }
    });

    const code = data?.code;
    if (code === 200) {
      const result: any = await handleRequest(context, {method: 'get', url: '/accountInfo'});

      if (result.code === 410) return {};
      return result.psdata;
    } else if (code === 306) {
      throw { message: 'Registration failed' };
    }

    return {};
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  logIn: async (context: Context, { username, password }) => {
    const data = await handleRequest(context, {method: 'post',
      url: '/login',
      data: {
        email: username,
        password: password
      }
    });
    const code = data.code;

    if (code === 306) {
      throw { message: 'The provided credentials are invalid' };
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
    const data = await handleRequest(context, {method: 'post',
      url: '/accountedit',
      data: updatedUserData
    });

    if (data.success) {
      const result: any = await handleRequest(context, {method: 'get', url: '/accountInfo'});

      return result.psdata;
    }
  }
};

export const useUser = useUserFactory<User, UpdateParams, RegisterParams>(params);
