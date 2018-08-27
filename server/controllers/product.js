/*
 * Product Controller.
 */

var ProductModel = require("../models/product.js");

exports.getProducts = function(req, res) {
  var query = {};
  if (req.query.category !== undefined) {
    query = { category: req.query.category, quantity: { $gte: 1 } };
  } else {
    query = { quantity: { $gte: 1 } };
  }
  ProductModel.find(query, null, { sort: "id" }, function(err, products) {
    res.send(products);
  });
};

exports.getProductById = function(req, res) {
  ProductModel.findOne({ id: req.params.id }, function(err, product) {
    console.log(product);
    res.send(product);
  });
};

exports.getProductsByStore = function(req, res) {
  ProductModel.find({ storeId: req.params.id }, null, { sort: "id" }, function(err, products) {
    res.send(products);
  });
};

exports.getProductsByStoreAddress = function(req, res) {
  ProductModel.find({ storeAddress: req.params.address }, null, { sort: "id" }, function(err, products) {
    res.send(products);
  });
};
