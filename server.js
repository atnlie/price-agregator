const express = require('express');
const agregatorRoutes = require('./src/agregator/routes');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Price Agregator version 1.0 by Atnlie - 2023');
});

app.use('/api/v1/agregator', agregatorRoutes);



app.listen(3000, () => {
    console.log(`Server is listening on port ${port}`);
});
