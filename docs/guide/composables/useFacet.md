## useFacet 

`useFacet` composable can be used to:
- fetch products
- fetch categories
- filter products - based on PrestaShop faceted search module

## API
- `search` Fetches the category data and saves results from the API in the result property.
- `result` Reactive data object containing the response from the backend.
- `loading` Reactive object containing information about the loading state of search.
- `error` Reactive object containing the error message, if search failed for any reason.

