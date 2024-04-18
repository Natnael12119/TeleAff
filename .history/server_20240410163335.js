const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const Product = require('./models/product');
const sequelize = require('./db');
const path = require('path');
const errorhandler = require('errorhandler');

const productController = require('./controllers/productController');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

sequelize.sync()
  .then(() => {
    console.log('Database synchronized');
  })
  .catch((error) => {
    console.error('Error synchronizing database:', error);
  });

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile('productForm.html', { root: 'views' });
});

app.post('/products', productController.upload.single('productImage'), productController.submitProduct);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

if (process.env.NODE_ENV === 'development') {
  app.use(errorhandler());
}