# Front-End JavaScript Test
One of the things that our customers use Cliniko for is to keep track of the products that they sell.

We would like you to build a simple **single page app** for managing products via our publicly available API.

We are interested in seeing a modular, component-based approach to the UI and models. You can build this using whatever framework and tooling that you like. If you know Angular, we'd love to see it built with that.

For the purpose of this test you don't need to worry about user logins or pagination. The HTML and styles are provided. You should have already received an API key for a test account with the data you need.

## Products Index Page: /products
- Get the [Products](https://github.com/redguava/cliniko-api/blob/master/sections/products.md) and build the table.
- The `.callout` shows the count of products
- Products can be filtered (on the client) by stock quantity. Sort by count and only show the rows with stock < count.

## View Product Details: /products/:id
- Get the product details and [Stock adjustments](https://github.com/redguava/cliniko-api/blob/master/sections/stock_adjustments.md) history
- Product can be deleted

## Edit Product Details: /products/:id/edit
Note that stock cannot be changed when editing a product. To save time, you do not need to implement stock adjustments.

## New Product: /products/new
New products can be added. Name and price are required fields and should show errors if skipped.
