/*
 * Admin Controller.
 */

var OrderModel = require("../models/order.js");

exports.getOrderById = function(req, res) {
  OrderModel.find({ id: req.params.id }, function(err, order) {
    res.send(order);
  });
};

exports.getOrders = function(req, res) {
  OrderModel.find({}, null, { sort: "id" }, function(err, orders) {
    res.send(orders);
  });
};

exports.getOrdersByBuyer = function(req, res) {
  OrderModel.find({ buyer: req.params.address }, null, { sort: "id" }, function(err, orders) {
    res.send(orders);
  });
};

exports.getOrdersByBSeller = function(req, res) {
  OrderModel.find({ seller: req.params.address }, null, { sort: "id" }, function(err, orders) {
    res.send(orders);
  });
};

exports.getOrdersRefunding = function(req, res) {
  OrderModel.find(
    { fundDisbursed: false, $or: [{ fundReleaseToBuyerFromBuyer: true }, { fundReleaseToBuyerFromSeller: true }] },
    null,
    { sort: "id" },
    function(err, order) {
      res.send(order);
    }
  );
};
