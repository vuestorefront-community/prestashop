# useBootstrap

`useBootstrap` composable is a custom composable which is responsible to load initial data for the application like menu items and currencies. The `useBootstrap` composable exposes three properties and one method:
- load()
- menuItems
- loading
- error

## API 

- `load()`
This method loads bootstrap calls PrestaShop `lightbootstrap` API and loads the properties, like `menuItems`.

- `menuItems`
This property contains array of category items.

