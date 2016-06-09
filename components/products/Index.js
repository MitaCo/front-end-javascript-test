const IndexController = (ProductsService) => {
  const controller = {
    allItems: [],
    items: []
  };

  ProductsService.getItems().then(items => {
    controller.allItems = items;
    controller.items = items;
  });

  controller.filterByStock = (stock) => {
    controller.items = controller.allItems.filter(item => item.stock_level >= stock)
  };

  return controller;
};


export default IndexController;
