const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
	id: Number,
	name: String,
	category: String,
	quantity: Number,
	imageLink: String,
	descriptionLink: String,
	price: Number,
  storeId: Number,
  storeAddress: String
});

const ProductModel = mongoose.model("ProductModel", ProductSchema);

module.exports = ProductModel;

// export function saveProduct(product) {
//   ProductModel.findOne({ id: product._id.toNumber() }, function(err, dbProduct) {
//     // if exist we dont save
//     if (dbProduct != null) {
//       return;
//     }

//     var newProduct = new ProductModel({
//       id: product._id,
//       name: product._name,
//       category: product._category,
//       quantity: product._quantity.toNumber(),
//       imageLink: product._imageLink,
//       descriptionLink: product.__descriptionLink,
//       price: product._price
//     });

//     newProduct.save(function(error) {
//       if (error) {
//         console.log(error);
//       }
//     });
//   });
// }

// export function updateProduct(product) {
//   ProductModel.findOneAndUpdate(
//     { id: product._id.toNumber() },
//     {
//       name: product._name,
//       category: product._category,
//       quantity: product._quantity.toNumber(),
//       imageLink: product._imageLink,
//       descriptionLink: product.__descriptionLink,
//       price: product._price
//     },
//     { new: true }
//   )
//     .then(data => {
//       if (data === null) {
//         throw new Error("product Not Found");
//       }
//       console.log("product updated", data);
//     })
//     .catch(error => {
//       console.log(error);
//     });
// }
