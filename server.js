const express = require('express');

const rateLimitMiddleware = require("./src/middleware/ratelimit");

const quotationRoutes = require('./src/quotation/routes');
const deliveryRoutes = require('./src/delivery/routes');
const customerRoutes = require('./src/routes/customer/routes');
const supplierRoutes = require('./src/routes/supplier/routes');
const productRoutes = require('./src/product/routes');
const pricelistRoute = require('./src/pricelist/routes');
const logisticRoutes = require('./src/logistic/routes');

// const dotenv = require("dotenv")
// dotenv.config()

const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(rateLimitMiddleware);
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
app.use('/api/v1/pricelist', pricelistRoute);
app.use('/api/v1/logistics', logisticRoutes);



app.listen(3000, () => {
    console.log(`Server is listening on port ${port}`);
});
