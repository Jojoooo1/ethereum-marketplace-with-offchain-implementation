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
var OrderModel = require("../models/order");

EventListner();

router.get("/products", function(req, res) {
  var query = {};
  if (req.query.category !== undefined) {
    query["category"] = { $eq: req.query.category };
  }
  ProductModel.find(query["category"], null, { sort: "id" }, function(err, products) {
    res.send(products);
  });
});

router.get("/products/:id", function(req, res) {
  ProductModel.findOne({ id: req.params.id }, function(err, product) {
    console.log(product);
    res.send(product);
  });
});

router.get("/stores/:id/products", function(req, res) {
  ProductModel.find({ storeId: req.params.id }, null, { sort: "id" }, function(err, products) {
    res.send(products);
  });
});

router.get("/stores-address/:address/products", function(req, res) {
  ProductModel.find({ storeAddress: req.params.address }, null, { sort: "id" }, function(err, products) {
    res.send(products);
  });
});

router.get("/stores/:id", function(req, res) {
  StoreModel.findOne({ id: req.params.id }, function(err, store) {
    res.send(store);
  });
});

router.get("/store/:address", function(req, res) {
  StoreModel.findOne({ address: req.params.address }, function(err, store) {
    res.send(store);
  });
});

router.get("/stores", function(req, res) {
  StoreModel.find({}, function(err, stores) {
    res.send(stores);
  });
});

router.get("/stores-approved", function(req, res) {
  StoreModel.find({ approved: true }, function(err, stores) {
    res.send(stores);
  });
});

router.get("/admins", function(req, res) {
  AdminModel.find({}, "address -_id", function(err, admins) {
    res.send(admins);
  });
});

router.get("/admins/:address", function(req, res) {
  AdminModel.findOne({ address: req.params.address }, "address -_id", function(err, admin) {
    res.send(admin);
  });
});

router.get("/orders/:buyer", function(req, res) {
  OrderModel.findOne({ buyer: req.params.buyer }, function(err, orders) {
    res.send(orders);
  });
});

router.get("/orders-buyer/:address", function(req, res) {
  OrderModel.find({ buyer: req.params.address }, null, { sort: "id" }, function(err, orders) {
    res.send(orders);
  });
});

router.get("/orders-seller/:address", function(req, res) {
  OrderModel.find({ seller: req.params.address }, null, { sort: "id" }, function(err, orders) {
    res.send(orders);
  });
});

router.get("/orders", function(req, res) {
  OrderModel.find({}, function(err, orders) {
    res.send(orders);
  });
});

function EventListner() {
  let productEvent;
  EcommerceStore.deployed().then(function(f) {
    var events = f.allEvents({ fromBlock: 0, toBlock: "latest" });
    events.watch(function(error, result) {
      switch (result.event) {
        case "NewAdmin":
          console.log(result.args);
          saveAdmin(result.args);
          break;
        case "AdminDeleted":
          console.log(result.args);
          deleteAdmin(result.args);
          break;
        case "NewStore":
          console.log(result.args);
          saveStore(result.args);
          break;
        case "StoreUpdated":
          console.log(result.args);
          updateStore(result.args);
          break;
        case "StoreRemoved":
          console.log(result.args);
          removeStore(result.args);
          break;
        case "StoreApproved":
          console.log(result.args);
          approveStore(result.args);
          break;
        case "NewProduct":
          console.log(result.args);
          saveProduct(result.args);
          break;
        case "ProductUpdated":
          console.log(result.args);
          updateProduct(result.args);
          break;
        case "ProductRemoved":
          console.log(result.args);
          removeProduct(result.args);
          break;
        case "NewOrder":
          console.log(result.args);
          saveOrder(result.args);
          break;
        case "updateOrder":
          console.log(result.args);
          updateOrder(result.args);
          break;

        default:
          return;
      }
    });
  });
}

function saveProduct(product) {
  ProductModel.findOne({ id: product._id.toNumber() }, function(err, dbProduct) {
    // if exist we dont save
    if (dbProduct != null) {
      return;
    }

    var newProduct = new ProductModel({
      id: product._id.toNumber(),
      name: product._name,
      category: product._category,
      quantity: product._quantity.toNumber(),
      imageLink: product._imageLink,
      descriptionLink: product._descriptionLink,
      price: product._price,
      storeId: product._storeId,
      storeAddress: product._storeAddress
    });

    newProduct.save(function(error) {
      if (error) {
        console.log(error);
      }
    });
  });
}

function saveStore(store) {
  StoreModel.findOne({ id: store._id.toNumber() }, function(err, dbStore) {
    if (dbStore != null) {
      return;
    }

    var newStore = new StoreModel({
      id: store._id.toNumber(),
      address: store._address,
      name: store._name,
      category: store._category,
      imageLink: store._imageLink,
      descriptionLink: store._descriptionLink,
      approved: false
    });

    newStore.save(function(error) {
      if (error) {
        console.log(error);
      }
    });
  });
}

function saveOrder(order) {
  OrderModel.findOne({ id: order._id.toNumber() }, function(err, dbOrder) {
    // if exist we dont save
    if (dbOrder != null) {
      return;
    }

    var neworder = new OrderModel({
      id: order._id.toNumber(),
      seller: order._seller,
      buyer: order._buyer,
      arbiter: order._arbiter,
      productId: order._productId,
      quantity: order._quantity,
      address: order._address
    });

    neworder.save(function(error) {
      if (error) {
        console.log(error);
      }

      ProductModel.findOne({ id: order._id.toNumber() }, function(err, dbProduct) {
        let updatedQty = dbProduct.quantity - order._quantity;
        console.log(updatedQty);
        ProductModel.findOneAndUpdate(
          { id: order._productId.toNumber() },
          {
            quantity: updatedQty
          }
        );
      });
    });
  });
}

function updateProduct(product) {
  ProductModel.findOneAndUpdate(
    { id: product._id.toNumber() },
    {
      name: product._name,
      category: product._category,
      quantity: product._quantity.toNumber(),
      imageLink: product._imageLink,
      descriptionLink: product._descriptionLink,
      price: product._price
    }
  )
    .then(data => {
      if (data === null) {
        throw new Error("Product Not Found");
      }
      console.log("Product updated", data);
    })
    .catch(error => {
      console.log(error);
    });
}

function updateStore(store) {
  StoreModel.findOneAndUpdate(
    { id: store._id.toNumber() },
    {
      address: store._address,
      name: store._name,
      category: store._category,
      imageLink: store._imageLink,
      descriptionLink: store._descriptionLink
    }
  )
    .then(data => {
      if (data === null) {
        throw new Error("Store Not Found");
      }
      console.log("store updated", data);
    })
    .catch(error => {
      console.log(error);
    });
}
function approveStore(store) {
  StoreModel.update(
    { address: store._address },
    {
      approved: true
    },
    { upsert: true, setDefaultsOnInsert: true }
  )
    .then(data => {
      if (data === null) {
        throw new Error("Store Not Found");
      }
      console.log("store approved", data);
    })
    .catch(error => {
      console.log(error);
    });
}

function removeProduct(product) {
  ProductModel.deleteOne({ id: product._id.toNumber() }, function(err) {
    if (err) {
      console.log(err);
    }
  });
}

function removeStore(store) {
  StoreModel.deleteOne({ address: store._address }, function(err) {
    if (err) {
      console.log(err);
    }
    if (store._id != 0) {
      ProductModel.remove({ storeId: store._id.toNumber() }, function(err) {});
    }
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

function updateOrder(order) {
  if (order.disbursed == true) {
    OrderModel.findOneAndUpdate(
      { id: order._id.toNumber() },
      {
        status: "PAYED",
        [order.caller]: order.caller
      }
    )
      .then(data => {
        if (data === null) {
          throw new Error("Product Not Found");
        }
        console.log("Product updated", data);
      })
      .catch(error => {
        console.log(error);
      });
  } else {
    OrderModel.findOneAndUpdate(
      { id: order._id.toNumber() },
      {
        [order.caller]: order.caller
      }
    )
      .then(data => {
        if (data === null) {
          throw new Error("Product Not Found");
        }
        console.log("Product updated", data);
      })
      .catch(error => {
        console.log(error);
      });
  }
}

module.exports = router;
//     var newStore = new ProductModel({id: 1, address: "0x2078619d81e4d5686ab9fbf1c07941cbfe555d41", name: "name: store1", category: "category: 1", imageLink: "imageLink: test", descriptionLink: "des",      approved: false  });

// db.stores.save({id: 1, address: "0x2078619d81e4d5686ab9fbf1c07941cbfe555d41", name: "name: store1", category: "category: 1", imageLink: "imageLink: test", descriptionLink: "des",      approved: false  })
