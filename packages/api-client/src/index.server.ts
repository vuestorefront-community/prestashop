import { ApiClientExtension, apiClientFactory } from '@vue-storefront/core';
import * as api from './api';
import type { Setttings, Endpoints } from './types';
import axios from 'axios';

const onCreate = (settings) => {
  const client = axios.create({
    baseURL: settings.api.url + settings.api.restPath,
    xsrfHeaderName: 'x-csrf-token',
    // xsrfHeaderName: 'X-CSRF-Token',
    withCredentials: true,


  });

  return {
    config: {
      ...settings
    },
    client,
    cookies: (settings.api).cookies,
    settings: settings,
    api: settings.api
  };
};

const { createApiClient } = apiClientFactory<Setttings, Endpoints>({
  onCreate,
  api
});

export {
  createApiClient
};
