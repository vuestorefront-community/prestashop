import { CategoryGetters, AgnosticCategoryTree } from '@vue-storefront/core';
import type { PsCategory } from '@vue-storefront/prestashop-api';
import { populateCategoryInfo } from '../helpers';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getTree(category: PsCategory): AgnosticCategoryTree {
  return {
    label: '',
    slug: '',
    items: [],
    isCurrent: false
  };
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function getCategoryInfo(psdata) : any {
  if (!psdata.data) {
    return {};
  }
  return populateCategoryInfo(psdata.data);
}

export const categoryGetters: CategoryGetters<PsCategory> = {
  getTree,
  getCategoryInfo
};
