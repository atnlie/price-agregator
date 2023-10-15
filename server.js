const express = require('express');
const quotationRoutes = require('./src/quotation/routes');
const deliveryRoutes = require('./src/delivery/routes');
const customerRoutes = require('./src/customer/routes');
const supplierRoutes = require('./src/supplier/routes');
const productRoutes = require('./src/product/routes');

// const dotenv = require("dotenv")
// dotenv.config()

const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
}))

app.get('/', (req, res) => {
    res.send('Price Agregator version 1.0 by Atnlie - 2023');
});

app.use('/api/v1/customers', customerRoutes);
app.use('/api/v1/delivery', deliveryRoutes);
app.use('/api/v1/quotation', quotationRoutes);
app.use('/api/v1/suppliers', supplierRoutes);
app.use('/api/v1/products', productRoutes);


app.listen(3000, () => {
    console.log(`Server is listening on port ${port}`);
});
