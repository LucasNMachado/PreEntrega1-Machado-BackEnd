const express = require('express');
const router = express.Router();
const ProductManager = require('../productManager');

const productManager = new ProductManager('./src/data/productos.json');

router.get('/', (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
  const products = productManager.getProducts(limit);
  res.json(products);
});

router.get('/:pid', (req, res) => {
  const productId = req.params.pid;
  try {
    const product = productManager.getProductById(productId);
    res.json(product);
  } catch (error) {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

router.post('/', (req, res) => {
  const product = req.body;
  productManager.addProduct(product);
  res.status(201).json({ message: 'Producto agregado correctamente' });
});

router.put('/:pid', (req, res) => {
  const productId = req.params.pid;
  const updatedFields = req.body;
  try {
    productManager.updateProduct(productId, updatedFields);
    res.json({ message: 'Producto actualizado correctamente' });
  } catch (error) {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

router.delete('/:pid', (req, res) => {
  const productId = req.params.pid;
  try {
    productManager.deleteProduct(productId);
    res.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

module.exports = router;
