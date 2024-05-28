const fs = require('fs');
const express = require('express');
const app = express();

// Importing productNames from names.json file
const productNames = JSON.parse(
    fs.readFileSync(`${__dirname}/data/names.json`)
);

// Middleware to parse JSON requests
app.use(express.json());

// GET endpoint for sending the product to client by id
// Endpoint - /api/v1/names/:id
app.get('/api/v1/names/:id', (req, res) => {
    // Retrieve the id parameter from the request
    const id = parseInt(req.params.id);

    // Search for the product name with matching id
    const product = productNames.find(product => product.id === id);

    if (product) {
        // If product found, return it with status code 200
        res.status(200).json({
            status: 'success',
            message: 'Product name fetched successfully',
            data: {
                name: product
            }
        });
    } else {
        // If product not found, return 404 with appropriate message
        res.status(404).json({
            status: 'failed',
            message: 'Not found!'
        });
    }
});

module.exports = app;
