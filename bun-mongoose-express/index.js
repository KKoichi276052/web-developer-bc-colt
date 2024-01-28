import express from 'express';

const app = express();
const path = require('path');
const port = 3000;
const methodOverride = require('method-override');
const { v4: uuid } = require('uuid');

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

const mongoose = require('mongoose');
const Product = require('./model/product');
mongoose
  .connect('mongodb://127.0.0.1:27017/farmStand')
  .then(() => {
    console.log('connection open');
  })
  .catch((err) => {
    console.log('error');
    console.log(err);
  });

const categories = ['fruit', 'vegetable', 'dairy'];

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(methodOverride('_method'));

app.get('/products', async (req, res) => {
  const { category } = req.query;
  const products = category
    ? await Product.find({ category })
    : await Product.find({});
  // const products = await Product.find({});
  res.render('products/index', { products });
});

app.get('/products/new', (req, res) => {
  res.render('products/new', { categories });
});

app.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  console.log(product);
  res.render('products/show', { product });
});

app.post('/products', async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.redirect(`/products/${newProduct._id}`);
});

app.get('/products/:id/edit', async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render('products/edit', { product, categories });
});

app.put('/products/:id', async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  res.redirect(`/products/${product._id}`);
});

app.delete('/products/:id', async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await Product.findByIdAndDelete(id);
  res.redirect('/products');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
