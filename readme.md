# What I made here?

I made Angular 1.5 app using ES6 (babel) and webpack for build. Because I made this probably too early and on my own, I didn't want to spend too much time for nothing. This can be made better and more functional.

Because api.cliniko.com does not allow CORS from front-end app it's not possible to use it. I could use JSONP requests but that is not point of this test. So I made app without any interactions with server. But that was too easy so I made simple rails app that will proxy all requests to api.cliniko.com. That look like this:

**routes.rb**
```
get ':all' => 'proxy#proxy_request'
post ':all' => 'proxy#proxy_request'
put ':all' => 'proxy#proxy_request'
delete ':all' => 'proxy#proxy_request'
```
**proxy_controller.rb**
```
def proxy_request
  headers['Access-Control-Allow-Origin'] = '*'
  headers['Access-Control-Allow-Methods'] = 'POST, PUT, DELETE, GET, OPTIONS'
  headers['Access-Control-Request-Method'] = '*'
  headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  response = RestClient.send request.env['REQUEST_METHOD'].downcase, "https://<MY_API_KEY_GOES_HERE>@api.cliniko.com/v1" + request.env['PATH_INFO'] #+ params
  render json: response.to_str
end
```
Because of different ports I was using for Angular app (webpack) and Rails I need here CORS headers.

Then I changed my front-end app to use this proxy as API endpoint. GET requests worked but I have some problem with POST/PUT requests. I tried to figure out what is problem with RestClient but didn't wanted to spent too much time on it so I left as is. ( P.S. There is a validation error on [this example](https://github.com/redguava/cliniko-api/blob/master/sections/products.md#create-product) ) App now get products from API but does not store or delete changes - that is handled only on front-end.

## Known bad parts of app
* no production build (missing production webpack config) so builded app is huge
* when you add new product or edit existing changes are not stored and they are reseted on each new API request
* controllers are not covered with tests


## Installation

You need to have Node.js 6 (I'm using nvm for node version management)

 ```npm install```

## Run dev server

 ```npm start```

## Run tests

 ```npm test```



# Front-End JavaScript Test
One of the things that our customers use Cliniko for is to keep track of the products that they sell.

We would like you to build a simple **single page app** for managing products via our publicly available API.

We are interested in seeing a modular, component-based approach to the UI and models. You can build this using whatever framework and tooling that you like. If you know Angular, we'd love to see it built with that.

For the purpose of this test you don't need to worry about user logins or pagination. The HTML and styles are provided. You can get an API key by signing up for a free trial of Cliniko. You'll need to create some products in there for test data.

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
