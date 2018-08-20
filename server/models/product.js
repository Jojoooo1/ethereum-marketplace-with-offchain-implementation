const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
	productId: Number,
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

const ProductModel = mongoose.model("ProductModel", ProductSchema);

module.exports = ProductModel;
