const express = require('express');
const productsRoutes = require('./routes/productsRoutes');
const cartsRoutes = require('./routes/cartsRoutes');

const app = express();
const port = 8080;

app.use(express.json());

app.use('/api/products', productsRoutes);
app.use('/api/carts', cartsRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
