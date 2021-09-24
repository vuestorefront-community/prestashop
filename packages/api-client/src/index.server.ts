import { apiClientFactory } from '@vue-storefront/core';
import type { Setttings, Endpoints } from './types';
import axios from 'axios';

import { bootstrap } from './api/bootstrap';
import { getProduct } from './api/getProduct';
import { getCategoryProducts } from './api/getCategoryProducts';

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
    bootstrap,
    getProduct,
    getCategoryProducts
  }
});

export {
  createApiClient
};
