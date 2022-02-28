import { getCurrentInstance } from '@vue/composition-api';

const getContext = () => {
  const vm = getCurrentInstance();
  return vm.root.proxy;
};

const nonFilters = ['page', 'sort', 'term', 'itemsPerPage'];

const reduceFilters = (query) => (prev, curr) => {
  const makeArray = Array.isArray(query[curr]) || nonFilters.includes(curr);

  return {
    ...prev,
    [curr]: makeArray ? query[curr] : [query[curr]]
  };
};

const getFiltersDataFromUrl = (context, onlyFilters) => {
  const { query } = context.$router.history.current;

  return Object.keys(query)
    .filter(f => onlyFilters ? !nonFilters.includes(f) : nonFilters.includes(f))
    .reduce(reduceFilters(query), {});
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useUiHelpers = () => {
  const context = getContext();

  const getFacetsFromURL = () => {
    const { query, params } = context.$router.currentRoute;
    const categorySlug = Object.keys(params).reduce((prev, curr) => params[curr] || prev, params.slug_1);

    return {
      rootCatSlug: params.slug_1,
      categorySlug,
      page: parseInt(query.page as string, 10) || 1,
      sort: query.sort || 'latest',
      filters: getFiltersDataFromUrl(context, true),
      itemsPerPage: parseInt(query.itemsPerPage as string, 12) || 20,
      term: query.term
    };
  };

  // eslint-disable-next-line
  const getCatLink = (category): string => {
    return `/c/${category.slug}`;
  };

  // eslint-disable-next-line
  const changeSorting = (sort: string) => {
    const { query } = context.$router.currentRoute;
    context.$router.push({ query: { ...query, sort } });
  };

  // eslint-disable-next-line
  const changeFilters = (filters: any) => {
    context.$router.push({
      query: {
        ...getFiltersDataFromUrl(context, false),
        ...filters
      }
    });
  };

  // eslint-disable-next-line
  const changeItemsPerPage = (itemsPerPage) => {
    console.warn('[VSF] please implement useUiHelpers.changeItemsPerPage.');
  };

  // eslint-disable-next-line
  const setTermForUrl = (term: string) => {
    console.warn('[VSF] please implement useUiHelpers.changeSearchTerm.');
  };

  // eslint-disable-next-line
  const isFacetColor = (facet): boolean => {
    console.warn('[VSF] please implement useUiHelpers.isFacetColor.');

    return false;
  };

  // eslint-disable-next-line
  const isFacetCheckbox = (facet): boolean => {
    console.warn('[VSF] please implement useUiHelpers.isFacetCheckbox.');

    return false;
  };

  const getSearchTermFromUrl = () => {
    console.warn('[VSF] please implement useUiHelpers.getSearchTermFromUrl.');
  };

  return {
    getFacetsFromURL,
    getCatLink,
    changeSorting,
    changeFilters,
    changeItemsPerPage,
    setTermForUrl,
    isFacetColor,
    isFacetCheckbox,
    getSearchTermFromUrl
  };
};

export default useUiHelpers;
