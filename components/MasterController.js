const MasterController = ($location, $rootScope, ProductsService) => {
  const controller = {};
  const titles = {
    '/': 'Cliniko products',
    '/product/new': 'Cliniko: New product',
    '/product/:id': 'Cliniko: View product',
    '/product/:id/edit': 'Cliniko: Edit product',
  }

  controller.metadata = {
    title: 'Cliniko products'
  };


  $rootScope.$on("$locationChangeSuccess", function(event, next, current) {
    controller.metadata.title = titles[$location.path().replace(/[0-9]/g, ':id')];
  });


  controller.viewProduct = (product) => {
    $location.path(`/product/${product.id}`);
  }

  return controller;
};

export default MasterController;
