import angularRoute from 'angular-route';
import indexTemplate from '../components/products/Index.html';
import showTemplate from '../components/products/Show.html';
import editTemplate from '../components/products/Edit.html';

const Router = ($routeProvider, $locationProvider) => {
  $routeProvider
  .when('/', {
    templateUrl: indexTemplate,
    controller: 'IndexController as index',
  })
  .when('/product/new', {
    templateUrl: editTemplate,
    controller: 'NewController as edit'
  })
  .when('/product/:id', {
    templateUrl: showTemplate,
    controller: 'ShowController as show'
  })
  .when('/product/:id/edit', {
    templateUrl: editTemplate,
    controller: 'EditController as edit'
  })
 .otherwise({
   redirectTo: '/'
 });

 $locationProvider.html5Mode(true);
};

export default Router;
