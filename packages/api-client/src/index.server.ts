import { apiClientFactory } from '@vue-storefront/core';
import type { Setttings, Endpoints } from './types';
import axios from 'axios';

import { getBootstrap } from './api/getBootstrap';

const onCreate = (settings) => {
  const client = axios.create({
    baseURL: settings.api.url
  });

  return {
    config: settings,
    client
  };
};

const { createApiClient } = apiClientFactory<Setttings, Endpoints>({
  onCreate,
  api: {
    getBootstrap
  }
});

export {
  createApiClient
};
