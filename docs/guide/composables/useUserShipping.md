## useUserShipping

The `useUserShipping` composable allows:
- fetching customer addresses,
- creating new shipping addresses,
- modifying and deleting existing shipping addresses.

## API

## `shipping`
Main data object populated by the `load()` method and updated by other methods in this composable.

## `load()`
Fetches shipping addresses of the current customer and saves results from the API in the `shipping` property.

## `addAddress()`
Creates a new shipping address for the current customer and saves an updated list of shipping addresses returned from the API in the `shipping` property.

## `deleteAddress()`
Deletes the shipping address of the current customer and saves an updated list of shipping addresses returned from the API in the `shipping` property.

## `updateAddress()`
Updates shipping address of the current customer and saves an updated list of shipping addresses returned from the API in the `shipping` property.

## `loading`
Indicates whether any of the methods above is in progress.

## `error`
Contains errors from any of the methods above.
