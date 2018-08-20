// Loading Smart contract
const web3 = require("web3");
const ecommerce_store_artifacts = require("../../build/contracts/EcommerceStore.json");
const contract = require("truffle-contract");
const provider = new web3.providers.HttpProvider("http://localhost:8545");
const EcommerceStore = contract(ecommerce_store_artifacts);
EcommerceStore.setProvider(provider);

// needed for fixing bug
EcommerceStore.currentProvider.sendAsync = function() {
  return EcommerceStore.currentProvider.send.apply(EcommerceStore.currentProvider, arguments);
};

const express = require("express");
const router = express.Router();
var ProductModel = require("../models/product");
var AdminModel = require("../models/admin");
var StoreModel = require("../models/store");

EventListner();

router.get("/products", function(req, res) {
  var query = {};
  if (req.query.category !== undefined) {
    query["category"] = { $eq: req.query.category };
  }
  ProductModel.find(query["category"], null, { sort: "productId" }, function(err, products) {
    res.send(products);
  });
});

router.get("/products/:id", function(req, res) {
  ProductModel.findOne({ productId: req.params.id }, function(err, product) {
    console.log(product)
    res.send(product);
  });
});

router.get("/admins", function(req, res) {
  AdminModel.find({}, "address -_id", function(err, admins) {
    res.send(admins);
  });
});

router.get("/stores", function(req, res) {
  AdminModel.find({}, function(err, stores) {
    res.send(stores);
  });
});

function EventListner() {
  let productEvent;
  EcommerceStore.deployed().then(function(f) {
    var events = f.allEvents({ fromBlock: 0, toBlock: "latest" });
    events.watch(function(error, result) {
      switch (result.event) {
        case "NewProduct":
          console.log(result.args);
          saveProduct(result.args);
          break;
        case "NewAdmin":
          console.log(result.args);
          saveAdmin(result.args);
          break;
        case "DeletedAdmin":
          console.log(result.args);
          saveProduct(result.args);
          break;
        default:
          return;
      }
    });
  });
}

function saveProduct(product) {
  ProductModel.findOne({ productId: product._productId.toNumber() }, function(err, dbProduct) {
    // if exist we dont save
    if (dbProduct != null) {
      return;
    }

    var newProduct = new ProductModel({
      productId: product._productId,
      name: product._name,
      category: product._category,
      quantity: product._quantity.toNumber(),
      ipfsImageHash: product._imageLink,
      ipfsDescriptionHash: product.__descriptionLink,
      startTime: product._startTime,
      price: product._price,
      condition: product._productCondition
    });

    newProduct.save(function(error) {
      if (error) {
        console.log(error);
      }
    });
  });
}

function saveAdmin(admin) {
  AdminModel.findOne({ address: admin._address }, function(err, dbProduct) {
    // if exist we dont save
    if (dbProduct != null) {
      return;
    }

    var newAdmin = new AdminModel({
      address: admin._address
    });

    newAdmin.save(function(error) {
      if (error) {
        console.log(error);
      }
    });
  });
}

function deleteAdmin(admin) {
  AdminModel.deleteOne({ address: admin._address }, function(err) {
    if (err) {
      console.log(err);
    }
  });
}

module.exports = router;
