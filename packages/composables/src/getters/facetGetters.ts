import {
  FacetsGetters,
  FacetSearchResult,
  AgnosticCategoryTree,
  AgnosticGroupedFacet,
  AgnosticPagination,
  AgnosticSort,
  AgnosticBreadcrumb,
  AgnosticFacet
} from '@vue-storefront/core';
import type { PsProduct, Facet, FacetSearchCriteria } from '@vue-storefront/prestashop-api';
import { populateCategoryProducts } from '../helpers';
import { populateCategoryTree } from '../helpers';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getAll(params: FacetSearchResult<Facet>, criteria?: FacetSearchCriteria): AgnosticFacet[] {
  return [];
}

const replaceSpacesWithDash = (word) => {
  return word.replace(/\s/g, '-');
};

const normalizeFacet = (result, facet) => {
  const label = replaceSpacesWithDash(facet.label);
  result.push({
    type: facet.type,
    id: label,
    label: facet.label,
    value: label,
    attrName: label,
    selected: facet.active,
    count: facet.magnitude
  });
  return result;
};

function buildFacets(facets = []) {
  return facets.reduce((result, facetGroup) => {
    if (facetGroup.displayed && facetGroup.widgetType !== 'slider') {
      const label = replaceSpacesWithDash(facetGroup.label);
      result.push(
        {
          id: label,
          label: facetGroup.label,
          options: facetGroup.filters.reduce(normalizeFacet, []),
          count: null
        }
      );
    }
    return result;
  }, []);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/explicit-module-boundary-types
function getGrouped(searchResult, criteria?: FacetSearchCriteria): AgnosticGroupedFacet[] {
  const facets = searchResult?.data?.facets;

  if (facets !== null) {
    return buildFacets(facets);
  }

  return [];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getSortOptions(params: FacetSearchResult<Facet>): AgnosticSort {
  return {
    options: [],
    selected: ''
  };
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function getCategoryTree(psdata: any): AgnosticCategoryTree {

  if (!psdata.data) {
    return {isCurrent: false, items: [], label: ''};
  }

  return populateCategoryTree(psdata.data.categories);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/explicit-module-boundary-types
function getProducts(psdata: any): PsProduct[] {
  if (!psdata.data) {
    return [];
  }
  const products = Array.isArray(psdata.data.products) ? psdata.data.products : [psdata.data.products];
  return populateCategoryProducts(products);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/explicit-module-boundary-types
function getPagination(searchResult): AgnosticPagination {
  if (!searchResult.data) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return {};
  }
  const pagination = searchResult.data?.pagination;

  return {
    currentPage: pagination.current_page,
    totalPages: pagination.pages_count,
    totalItems: pagination.total_items,
    itemsPerPage: 12,
    pageOptions: []
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getBreadcrumbs(params: FacetSearchResult<Facet>): AgnosticBreadcrumb[] {
  return [];
}

export const facetGetters: FacetsGetters<Facet, PsProduct[], FacetSearchCriteria> = {
  getSortOptions,
  getGrouped,
  getAll,
  getProducts,
  getCategoryTree,
  getBreadcrumbs,
  getPagination
};
