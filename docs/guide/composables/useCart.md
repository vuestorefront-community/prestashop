## useCart
`useCart` composable can be used to:
- load cart information,
- add, update and remove items in the cart,
- applying and removing coupons,
- checking if product is already added to the cart.

## API

- `load` - function to load cart information. If there is no cart assigned to current session/user, it will return a dummy cart without creating it in the backend.

- `addItem` - function to add an item to the cart. It requires the following params:
    - `currentCart: Cart`
    - `product: PsProduct`
    - `quantity: number`

- `removeItem` - function to remove an item from the cart. It requires the following params:
    - `currentCart: Cart`
    - `product: LineItem`

- `updateItemQty` - function to update the quantity of an item in the cart. It requires the following params:
    - `currentCart: Cart`
    - `product: LineItem`
    - `quantity: number`

- `clear` - function to remove all items from the cart. It requieres the following params:
    - `currentCart: Cart`

- `applyCoupon` - function to apply a coupon to the cart. It requires the following params:
    - `currentCart: Cart`
    - `couponCode: string`

- `removeCoupon` - function to remove a coupon from the cart. It requires the following params:
    - `currentCart: Cart`
    - `couponCode: string`

- `isInCart` - function to check if a product is already in the cart. It requires the following params:
    - `currentCart: Cart`
    - `product: PsProduct`
