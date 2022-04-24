## useUser
The `useUser` composable allows:
- loading customer data,
- registering, logging in, and logging out,
- changing password.

## API 

## `user`
Main data object populated by the `load()` method and updated by other methods in this composable.

## `load()`
Fetches the information about the current customer and saves results from the API in the user property.

## `register()`
Registers a new customer and saves details returned from the API in the user property.

## `login()`
Logs in the customer based on provided username and password and saves the details returned from the API in the user property.

## `logout()`
Logs out the current customer.

## `changePassword()`
Changes password of the current customer and saves the details returned from the API in the user property.

## `updateUser()`
Updates the current customer and saves the details returned from the API in the user property.

## `isAuthenticated`
Indicates whether the customer is authenticated or not.

## `loading`
Indicates whether any of the methods above is in progress.

## `error`
Contains errors from any of the methods above.
