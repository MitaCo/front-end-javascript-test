const NewController = ($location, ProductsService) => {
  const controller = {
    item: {
      tax: 0,
    }
  };

  controller.taxes = ProductsService.taxes;

  controller.cancel = () => {
    $location.path('/');
  };

  controller.save = (item, valid) => {
    if (valid) {
      ProductsService.saveItem(item);
      $location.path('/');
    }
  }

  return controller;
};


export default NewController;
