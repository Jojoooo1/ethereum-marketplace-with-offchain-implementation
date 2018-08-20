const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StoreSchema = new Schema({
  StoreId: Number,
  name: String,
  category: String,
  quantity: Number,
  ipfsImageHash: String,
  ipfsDescriptionHash: String,
  startTime: Number,
  price: Number,
  condition: Number,
  buyer: String
});

const StoreModel = mongoose.model("StoreModel", StoreSchema);

module.exports = StoreModel;
