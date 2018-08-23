const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StoreSchema = new Schema({
  id: Number,
  address: String,
  name: {
    type: String,
    default: ""
  },
  category: {
    type: String,
    default: ""
  },
  imageLink: {
    type: String,
    default: ""
  },
  descriptionLink: {
    type: String,
    default: ""
  },
  approved: {
    type: Boolean,
    default: false
  }
});

const StoreModel = mongoose.model("StoreModel", StoreSchema);

module.exports = StoreModel;
