const mongoose = require('mongoose');
const Product = require('./model/product');

// import mongoose from 'mongoose';
// import Product from './model/product';

mongoose
  .connect('mongodb://127.0.0.1:27017/farmStand')
  .then(() => {
    console.log('connection open');
  })
  .catch((err) => {
    console.log('error');
    console.log(err);
  });

////////////////////////////////////////////////////////
// const p = new Product({
//   name: 'grapefruit',
//   price: 1.99,
//   category: 'fruit',
// });

// p.save()
//   .then((p) => {
//     console.log(p);
//   })
//   .catch((err) => {
//     console.log('error');
//     console.log(err);
//   });

const seedProducts = [
  {
    name: 'Fairy Eggplant',
    price: 1.0,
    category: 'vegetable',
  },
  {
    name: 'Melon',
    price: 4.99,
    category: 'fruit',
  },
  {
    name: 'WaterMelon',
    price: 3.99,
    category: 'fruit',
  },
  {
    name: 'Celery',
    price: 1.99,
    category: 'vegetable',
  },
  {
    name: 'Milk',
    price: 2.69,
    category: 'dairy',
  },
];

Product.insertMany(seedProducts)
  .then((res) => {
    console.log(res);
  })
  .catch((e) => {
    console.log(e);
  });
