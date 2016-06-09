const ShowController = ($routeParams, $location, ProductsService) => {
  const controller = {
    item: {}
  };

  ProductsService.getItem(parseInt($routeParams.id, 10))
    .then(item => controller.item = item)
    .then(item => ProductsService.getStockAdjustments(item))
    .then(response => {
      controller.item.stockAdjusments = response.stock_adjustments;
    })
    ;

  controller.delete = (id) => {
    ProductsService.deleteItem(id);
    $location.path('/');
  }

  return controller;
};

export default ShowController;
