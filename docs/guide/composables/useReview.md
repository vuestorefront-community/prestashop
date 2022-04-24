## useReview
The `useReview` composable allows fetching and adding product reviews.

## API
- `addReview` - Adds product reviews and saves updated reviews details from the API in the `reviews` property.	
- `searchReviews` - Fetches reviews of the specified product and saves results from the API in the `reviews` property.
- `reviews` - Main data object populated by the search() method and updated by the add() method.
- `loading` - Indicates whether any of the methods above is in progress.
- `error` - Contains errors from any of the methods above.
