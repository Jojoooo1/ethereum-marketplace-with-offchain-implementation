/*
 * Store Controller.
 */

var StoreModel = require("../models/store.js");

exports.getStores = function(req, res) {
  StoreModel.find({}, null, { sort: "id" }, function(err, stores) {
    res.send(stores);
  });
};

exports.getStoresApproved = function(req, res) {
  StoreModel.find({ approved: true }, null, { sort: "id" }, function(err, stores) {
    res.send(stores);
  });
};

exports.getStoreById = function(req, res) {
  StoreModel.findOne({ id: req.params.id }, null, { sort: "id" }, function(err, store) {
    res.send(store);
  });
};

exports.getStoreByAddress = function(req, res) {
  StoreModel.findOne({ address: req.params.address }, function(err, store) {
    res.send(store);
  });
};
