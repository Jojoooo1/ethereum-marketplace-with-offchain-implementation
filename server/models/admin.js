const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
  address: String,
});

const AdminModel = mongoose.model("AdminModel", AdminSchema);

module.exports = AdminModel;
