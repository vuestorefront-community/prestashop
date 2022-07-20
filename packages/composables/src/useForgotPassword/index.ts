import {
  Context,
  useForgotPasswordFactory,
  UseForgotPasswordFactoryParams
} from '@vue-storefront/core';
import {handleRequest} from '../helpers';

const factoryParams: UseForgotPasswordFactoryParams<any> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  resetPassword: async (context: Context, { email, customQuery }) => {
    const data = await handleRequest(context, {method: 'post',
      url: '/resetPassword',
      params: {
        email: email
      }
    });

    if (data?.errors) {
      throw { message: data?.errors ? data?.errors : 'Password Reset failed' };
    }
    return {};
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setNewPassword: async (context: Context, { tokenValue, newPassword, customQuery }) => {
    console.log('Mocked: setNewPassword');
    return {};
  }
};

export const useForgotPassword = useForgotPasswordFactory<any>(factoryParams);
