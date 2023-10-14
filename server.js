const express = require('express');
// const agregatorRoutes = require('./src/agregator/routes');
const quotationRoutes = require('./src/quotation/routes');

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

app.use('/api/v1/quotation', quotationRoutes);



app.listen(3000, () => {
    console.log(`Server is listening on port ${port}`);
});
