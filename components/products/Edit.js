const EditProduct = ($location, $routeParams, ProductsService) => {
  const controller = {
    item: {}
  };

  ProductsService.getItem(parseInt($routeParams.id, 10)).then(item => controller.item = item);

  controller.taxes = ProductsService.taxes;

  controller.cancel = () => {
    $location.path(`/product/${controller.item.id}`);
  };

  controller.save = (item, valid) => {
    if (valid) {
      ProductsService.saveItem(item);
      $location.path(`/product/${item.id}`);
    }
  };

  return controller;
};

export default EditProduct;
