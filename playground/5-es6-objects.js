const product = {
  label: 'Red notebook',
  price: 3,
  stock: 201,
  salePrice: 21,
};

const { label, ...test } = product;
console.log('testing');
console.log(test);

// const transaction = ('order', product) => {

// }
