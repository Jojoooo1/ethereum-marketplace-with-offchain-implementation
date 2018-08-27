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

const productController = require("../controllers/product");
const storeController = require("../controllers/store");
const adminController = require("../controllers/admin");
const orderController = require("../controllers/order");

const express = require("express");
const router = express.Router();
var ProductModel = require("../models/product");
var AdminModel = require("../models/admin");
var StoreModel = require("../models/store");
var OrderModel = require("../models/order");

EventListner();

router.get("/products", productController.getProducts);
router.get("/products/:id", productController.getProductById);
router.get("/stores/:id/products", productController.getProductsByStore);
router.get("/stores-address/:address/products", productController.getProductsByStoreAddress);

router.get("/stores", storeController.getStores);
router.get("/stores/:id", storeController.getStoreById);
router.get("/store/:address", storeController.getStoreByAddress);
router.get("/stores-approved", storeController.getStoresApproved);

router.get("/admins", adminController.getAdmins);
router.get("/admins/:address", adminController.getAdminByAddress);

router.get("/orders/:id", orderController.getOrderById);
router.get("/orders", orderController.getOrders);
router.get("/orders-buyer/:address", orderController.getOrdersByBuyer);
router.get("/orders-seller/:address", orderController.getOrdersByBSeller);
router.get("/orders-refunding", orderController.getOrdersRefunding);

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
        case "FundReleaseToSeller":
          console.log(result.args);
          updateRealeasedFundToSeller(result.args);
          break;
        case "FundReleaseToBuyer":
          console.log(result.args);
          updateRealeasedFundToBuyer(result.args);
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
    },
    { new: true }
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
function removeProduct(product) {
  ProductModel.deleteOne({ id: product._id.toNumber() }, function(err) {
    if (err) {
      console.log(err);
    }
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
function updateStore(store) {
  StoreModel.findOneAndUpdate(
    { id: store._id.toNumber() },
    {
      address: store._address,
      name: store._name,
      category: store._category,
      imageLink: store._imageLink,
      descriptionLink: store._descriptionLink
    },
    { new: true }
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
  StoreModel.findOneAndUpdate(
    { address: store._address },
    {
      approved: true
    },
    { new: true }
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
      address: order._orderAddress
    });

    neworder.save(function(error) {
      if (error) {
        console.log(error);
      }

      ProductModel.findOne({ id: order._productId.toNumber() }, function(err, dbProduct) {
        let updatedQty = dbProduct.quantity - order._quantity;
        console.log(updatedQty);
        ProductModel.findOneAndUpdate(
          { id: order._productId.toNumber() },
          {
            quantity: updatedQty
          },
          { new: true }
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
      });
    });
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

function updateRealeasedFundToSeller(order) {
  OrderModel.findOne({ id: order._orderId.toNumber() }, function(err, dbOrder) {
    let callerType;
    switch (order._caller) {
      case dbOrder.seller:
        callerType = "fundReleaseToSellerFromSeller";
        break;
      case dbOrder.buyer:
        callerType = "fundReleaseToSellerFromBuyer";
        break;
      case dbOrder.arbiter:
        callerType = "fundReleaseToSellerFromArbiter";
        break;
      default:
        return;
    }
    if (order._fundDisbursed) {
      OrderModel.findOneAndUpdate(
        { id: order._orderId.toNumber() },
        {
          [callerType]: true,
          fundDisbursed: true,
          status: "PAYED"
        },
        { new: true }
      )
        .then(data => {
          if (data === null) {
            throw new Error("Order Not Found");
          }
          console.log("Order updated", data);
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      OrderModel.findOneAndUpdate(
        { id: order._orderId.toNumber() },
        {
          [callerType]: true,
          fundDisbursed: false
        },
        { new: true }
      )
        .then(data => {
          if (data === null) {
            throw new Error("Order Not Found");
          }
          console.log("Order updated", data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  });
}
function updateRealeasedFundToBuyer(order) {
  OrderModel.findOne({ id: order._orderId.toNumber() }, function(err, dbOrder) {
    let callerType;
    switch (order._caller) {
      case dbOrder.seller:
        callerType = "fundReleaseToBuyerFromSeller";
        break;
      case dbOrder.buyer:
        callerType = "fundReleaseToBuyerFromBuyer";
        break;
      case dbOrder.arbiter:
        callerType = "fundReleaseToBuyerFromArbiter";
        break;
      default:
        return;
    }
    if (order._fundDisbursed) {
      OrderModel.findOneAndUpdate(
        { id: order._orderId.toNumber() },
        {
          [callerType]: true,
          fundDisbursed: true,
          status: "PAYED"
        },
        { new: true }
      )
        .then(data => {
          if (data === null) {
            throw new Error("Order Not Found");
          }
          console.log("Order updated", data);
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      OrderModel.findOneAndUpdate(
        { id: order._orderId.toNumber() },
        {
          [callerType]: true,
          fundDisbursed: false
        },
        { new: true }
      )
        .then(data => {
          if (data === null) {
            throw new Error("Order Not Found");
          }
          console.log("Order updated", data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  });
}

module.exports = router;
//     var newStore = new ProductModel({id: 1, address: "0x2078619d81e4d5686ab9fbf1c07941cbfe555d41", name: "name: store1", category: "category: 1", imageLink: "imageLink: test", descriptionLink: "des",      approved: false  });

// db.stores.save({id: 1, address: "0x2078619d81e4d5686ab9fbf1c07941cbfe555d41", name: "name: store1", category: "category: 1", imageLink: "imageLink: test", descriptionLink: "des",      approved: false  })
