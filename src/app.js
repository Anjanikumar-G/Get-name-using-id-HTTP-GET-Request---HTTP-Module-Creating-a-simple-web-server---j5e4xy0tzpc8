const fs = require("fs");
const express = require("express");
const app = express();

// Importing productNames from names.json file
const productNames = JSON.parse(
  fs.readFileSync(`${__dirname}/data/names.json`)
);

//Middlewares
app.use(express.json());

// GET endpoint for sending the products to client by id
//Endpoint - /api/v1/names/:id
app.get("/api/v1/names/:id", (req, res) => {
  const userId = req.params.id;
  const user = productNames.filter(item => {
    return item.id == Number(userId);
});
  
  if (user.length !== 0) {
    const resObj={productName:{...user[0]}};
    res.status(200).send({
      status: "success",
      message: "Product name fetched successfully",
      data: resObj,
    });
  } else {
    res.status(404).send({ status: "failed", message: "Not found!" });
  }
});

module.exports = app;
