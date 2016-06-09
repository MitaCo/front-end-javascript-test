import './styles.sass';
import angular from 'angular';
import routes from './config/routes';
import MasterController from './components/MasterController';
import IndexController from './components/products/Index';
import EditController from './components/products/Edit';
import ShowController from './components/products/Show';
import NewController from './components/products/New';
import ProductsService from './services/ProductsService';

const App = angular.module('app', ['ngRoute'])
  .config(routes)
  .service('ProductsService', ProductsService)
  .controller('MasterController', MasterController)
  .controller('IndexController', IndexController)
  .controller('EditController', EditController)
  .controller('ShowController', ShowController)
  .controller('NewController', NewController)
  ;

export default App;
