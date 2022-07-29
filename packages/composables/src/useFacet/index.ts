import {
  Context,
  useFacetFactory,
  FacetSearchResult
} from '@vue-storefront/core';
import type {
  UseFacetSearchParams as SearchParams
} from '../types';
import {handleRequest} from '../helpers';

const replaceDashWithSpace = (word) => {
  return word.replace('-', ' ');
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const facetParams = (filters) : string => {
  let urlString = '';
  let counter = 0;
  for (const facet in filters) {
    if (Object.prototype.hasOwnProperty.call(filters, facet)) {
      const filterArray = filters[facet];
      if (filterArray.length !== 0) {
        // eslint-disable-next-line max-depth
        if (counter !== 0) {
          urlString += '/';
        }
        urlString += (replaceDashWithSpace(facet));

        // eslint-disable-next-line max-depth
        for (const filter of filterArray) {
          urlString += ('-' + replaceDashWithSpace(filter));
        }
        counter ++;
      }
    }
  }

  return urlString;
};

const factoryParams = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  search: async (context: Context, params: FacetSearchResult<SearchParams>) => {
    let data;
    if (params.input.type && params.input.type === 'instant-search') {
      data = await handleRequest(context, {method: 'get',
        url: '/productSearch',
        params: {
          s: params.input.term
        }
      });
    } else {
      data = await handleRequest(context, {method: 'get',
        url: '/categoryProducts',
        params: {
          slug: params.input.categorySlug,
          q: facetParams(params.input.filters),
          sortBy: params.input.sort,
          page: params.input.page,
          // eslint-disable-next-line camelcase
          with_all_images: '0',
          // eslint-disable-next-line camelcase
          with_category_tree: '1'
        }
      });
    }

    return data.psdata;
  }
};

export const useFacet = useFacetFactory<SearchParams>(factoryParams);
