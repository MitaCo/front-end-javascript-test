import Api from '../config/api';

const ProductsService = ($http, $q) => {
  Object.prototype.priceWithTax = function() {
    let price = parseFloat(this.price);
    if (!this.taxIncluded){
      price += price/100 * this.tax
    }
    return price ? price.format(2) : undefined;
  };

  Object.prototype.priceWithoutTax = function() {
    let price = parseFloat(this.price);
    if (this.taxIncluded){
      price = price / ( 1 + this.tax/100 );
    }
    return price ? price.format(2) : undefined;
  };

  Number.prototype.format = function(n, x) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
  };

  // Items for testing when there is no API service
  const service = {
    items: [],
  };

  service.taxes = {
    0: 'N/A',
    10: 'GST (10.0%)',
    7: 'MST (7.0%)',
  };

  service.normalize = (item) => {
    if (item) {
      item.cost_price = parseFloat(item.cost_price);
      item.price = parseFloat(item.price_ex_tax);
      item.taxIncluded = false;
      item.tax = 10;
    }
    return item;
  };

  service.getItems = () => {
    const deferred = $q.defer();
    // We need some PROXY to get products from api.cliniko.com beacuse of CORS settings
    if (service.items.length > 0){
      deferred.resolve(service.items);
    }
    // update in background or resolve promise
    $http({
      url: Api.baseUrl + '/products',
      method: 'GET',
    }).then(response => {
      service.items = response.data.products.map(item => service.normalize(item));
      deferred.resolve(service.items);
    });
    // So we can mock this
    // deferred.resolve(service.items);
    return deferred.promise;
  };

  service.getItem = (id) => {
    const deferred = $q.defer();
    let item = service.items.filter(item => item.id === id)[0]
    if (item) {
      deferred.resolve(item);
    } else {
      $http({
        url: Api.baseUrl + '/products/' + id,
        method: 'GET',
        cache: true
      }).then(response => {
        item = service.normalize(response.data);
        deferred.resolve(item);
      });
    }
    return deferred.promise;
  };

  service.getStockAdjustments = (item) => {
    const deferred = $q.defer();
    if (item && item.stockAdjusments) {
      deferred.resolve(item.stockAdjusments);
    } else {
      $http({
        url: Api.baseUrl + '/stock_adjustments?q=product_id:=' + item.id,
        method: 'GET',
        cache: true
      }).then(response => {
        item.stockAdjusments = response.data;
        deferred.resolve(item.stockAdjusments);
      });
    }
    return deferred.promise;
  };

  service.saveItem = item => {
    const deferred = $q.defer();
    // create new
    if (!item.stockLevel){
      item.stockLevel = 0;
    }
    if (!item.id){
      // $http({
      //   url: Api.baseUrl + '/products/',
      //   method: 'POST',
      //   data: item
      // }).then(response => {
        item.id = service.items.length + 1;
        service.items.push(item);
        deferred.resolve('added');
      // });
    } else {
      // $http({
      //   url: Api.baseUrl + '/products/' + item.id,
      //   method: 'PUT',
      //   data: item
      // }).then(response => {
        service.items = service.items.map(oldItem => {
          if (oldItem.id === item.id) {
            oldItem = item;
          }
          return oldItem;
        })
        deferred.resolve('added');
      // });
    }


    return deferred.promise;
  };


  service.deleteItem = id => {
    return service.items = service.items.filter(item => item.id !== id);
  };

  return service;
};

export default ProductsService;
