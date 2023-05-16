import {
  Context,
  useCategoryFactory,
  UseCategoryFactoryParams
} from '@vue-storefront/core';
import type { PsCategory } from '@vue-storefront/prestashop-api';
import type {
  UseCategorySearchParams as SearchParams
} from '../types';

const params: UseCategoryFactoryParams<PsCategory, SearchParams> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  categorySearch: async (context: Context, { customQuery, ...params }) => {
    console.log('Mocked: useCategory.categorySearch');

    return [
    ];
  }
};

export const useCategory = useCategoryFactory<PsCategory, SearchParams>(params);
