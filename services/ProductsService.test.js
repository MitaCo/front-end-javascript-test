import test from 'tape';
import $q from 'q'
import ProductsService from './ProductsService';

const $http = () => ({then: (cb) => cb({data: undefined})});

const service = new ProductsService($http, $q);

service.items = [
  {id: 1, code: 101, name: 'product1', price: 26.4, cost_price: 4, tax: 10, taxIncluded: true, product_supplier_name: 'DermaSoft ltd', serial_number: 12, stock_level: 10},
  {id: 2, code: 102, name: 'product2', price: 24, cost_price: 4, tax: 10, taxIncluded: false, product_supplier_name: 'DermaSoft ltd', serial_number: 13, stock_level: 9},
  {id: 3, code: 103, name: 'product2', price: 24, cost_price: 4, tax: 10, taxIncluded: false, product_supplier_name: 'DermaSoft ltd', serial_number: 14, stock_level: 8},
];


test('Testing Products Service', (t) => {
  service.saveItem({name:'test', price:100, tax: 10}).then(() => {
    service.getItem(4).then(item => {
      t.equal(item.priceWithTax(), '110.00', 'Test price With Tax');
      t.equal(item.priceWithoutTax(), '100.00', 'Test price Without Tax');
    });
  });

  service.saveItem({name:'test', price:110, tax: 10, taxIncluded:true}).then(() => {
    service.getItem(5).then(item => {
      t.equal(item.priceWithTax(), "110.00", 'Test price With Tax');
      t.equal(item.priceWithoutTax(), "100.00", 'Test price Without Tax');
    });
  });

  service.saveItem({id: 2, name:'test', price:110, tax: 10, taxIncluded:true}).then(() => {
    service.getItem(2).then(item => {
      t.equal(item.name, 'test', 'Test update item');
    });
  });

  service.getItem(3).then(item => {
    t.equal(item.id, 3, 'Test Before Delete item');
  });

  t.equal(service.normalize({price_ex_tax: "100.00", cost_price: "2.2"}).price, 100.0, 'Testing data normalization price');
  t.equal(service.normalize({price_ex_tax: "100.00", cost_price: "2.2"}).cost_price, 2.2, 'Testing data normalization cost_price');
  t.equal(service.normalize({price_ex_tax: "100.00", cost_price: "2.2"}).taxIncluded, false, 'Testing data normalization taxIncluded');
  t.equal(service.normalize({price_ex_tax: "100.00", cost_price: "2.2"}).tax, 10, 'Testing data normalization tax');

  setTimeout(() => {
    service.deleteItem(3);
    service.getItem(3).then(item => {
      t.equal(item, undefined, 'Test After Delete item');
    });
  }, 0)

  t.end();
});
