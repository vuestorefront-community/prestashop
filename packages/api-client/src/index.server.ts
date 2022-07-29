import { ApiClientExtension, apiClientFactory } from '@vue-storefront/core';
import * as api from './api';
import type { Setttings, Endpoints } from './types';
import cookieExtension from './extensions/cookie-config';
import axios from 'axios';

const onCreate = (settings) => {
  const client = axios.create({
    baseURL: settings.api.url + settings.api.restPath,
    xsrfHeaderName: 'x-csrf-token',
    // xsrfHeaderName: 'X-CSRF-Token',
    withCredentials: true
  });

  return {
    config: {
      ...settings
    },
    client,
    cookies: (settings.api).cookies
  };
};

const { createApiClient } = apiClientFactory<Setttings, Endpoints>({
  onCreate,
  // eslint-disable-next-line line-comment-position
  api
  // TODO: Not sure if this should be used, but might be necessary for cookies on SSR
  // extensions: [
  //   cookieExtension
  //   // tokenExtension
  // ]
});

export {
  createApiClient
};
