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
    const data: any = await handleRequest(context, {method: 'get', url: '/accountInfo'});

    if (data?.errorCode) {
      throw { message: data?.errors ? data?.errors : 'User load failed' };
      return null;
    }

    return data?.psdata;

    // todo: setup User type
    return {};
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  logOut: async (context: Context) => {
    const data = await handleRequest(context, {method: 'get', url: '/logout'});

    context.$prestashop.config.app.$cookies.remove(context.$prestashop.config.app.$config.psCustomerCookieKey);
    context.$prestashop.config.app.$cookies.remove(context.$prestashop.config.app.$config.psCustomerCookieValue);
    context.$prestashop.config.app.$cookies.remove('moquiSessionToken');
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateUser: async (context: Context, { currentUser, updatedUserData }) => {
    // console.log('updateUser updatedUserData ' + JSON.stringify(updatedUserData));
    // let data;
    // let data2;
    const data = await handleRequest(context, {method: 'post',
      url: '/accountedit',
      data: updatedUserData
    });

    console.log('updateUser data: ' + JSON.stringify(data));
    const data2 = await handleRequest(context, {method: 'get', url: '/accountInfo'});

    if (data?.errors) throw { message: data?.errors ? data?.errors : 'Update User failed' };
    if (data?.psdata?.message && !data2?.psdata?.message) data2.psdata.message = data?.psdata?.message;

    console.log('updateUser data2: ' + JSON.stringify(data2));

    return data2.psdata;

    // console.log('updateUser data ' + JSON.stringify(data));
    // return data;
    // console.log('updateUser data2 ' + JSON.stringify(data2));

    // const data2: any = await ;
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

    // Logger.error('data: ' + JSON.stringify(data));

    if (data?.errors) {
      throw { message: data?.errors ? data?.errors : 'Registration failed' };
    }

    const code = data?.code;
    if (code === 200) {
      const data: any = await handleRequest(context, {method: 'get', url: '/accountInfo'});

      if (data.code === 410) return {};
      return data.psdata;
    } else if (code === 306) {
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

    if (data?.errorCode) {
      throw { message: data?.errors ? data?.errors : 'The provided credentials are invalid' };
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

    const data2: any = await handleRequest(context, {method: 'get', url: '/accountInfo'});

    if (data?.errors) throw { message: data?.errors ? data?.errors : 'It was not possible to update your password.' };
    if (data?.psdata?.message && !data2?.psdata?.message) data2.psdata.message = data?.psdata?.message;

    console.log('changePassword data2: ' + JSON.stringify(data2));

    return data2.psdata;
  }
};

export const useUser = useUserFactory<User, UpdateParams, RegisterParams>(params);
