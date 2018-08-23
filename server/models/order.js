const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  id: Number,
  seller: String,
  buyer: String,
  arbiter: String,
  productId: Number,
  quantity: Number,
  address: String,
  status: {
    type: String,
    default: "CREATED"
  },
  fundReleaseToBuyerFrombuyer: {
    type: Boolean,
    default: false
  },
  fundReleaseToBuyerFromSeller: {
    type: Boolean,
    default: false
  },
  fundReleaseToBuyerFromArbiter: {
    type: Boolean,
    default: false
  },
  fundReleaseToSellerFrombuyer: {
    type: Boolean,
    default: false
  },
  fundReleaseToSellerFromSeller: {
    type: Boolean,
    default: false
  },
  fundReleaseToSellerFromArbiterT: {
    type: Boolean,
    default: false
  }
});

const OrderModel = mongoose.model("OrderModel", OrderSchema);

module.exports = OrderModel;
