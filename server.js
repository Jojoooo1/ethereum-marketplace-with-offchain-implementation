// Loading Smart contract
const ecommerce_store_artifacts = require("./build/contracts/EcommerceStore.json");
const contract = require("truffle-contract");
const web3 = require("web3");
var provider = new web3.providers.HttpProvider("http://localhost:8545");
const EcommerceStore = contract(ecommerce_store_artifacts);
EcommerceStore.setProvider(provider);

// Loading the DB
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var ProductModel = require("./product");
mongoose.connect(
	"mongodb://localhost:27017/ebay_dapp",
	{ useNewUrlParser: true }
	);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const express = require("express");
var app = express();

app.use(function(req, res, next){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Reuested-With, Content-Type, Accept");
	next();
})

app.listen(3000, function() {
	console.log("server Started on port 3000");
});

app.get("/products", function(req, res) {
	var query = {};
	if(req.query.category !== undefined) {
		query["category"] = {$eq: req.query.category}
	}
	ProductModel.find(query["category"], null, { sort: "productId" }, function(err, products) {
		console.log(products.length);
		res.send(products);
	});
});

setUpProductEventListner();

function setUpProductEventListner() {
	let productEvent;
	EcommerceStore.deployed().then(function(f) {
		productEvent = f.NewProduct({ fromBlock: 0, toBlocl: "latest" });
		productEvent.watch(function(err, result) {
			if (err) {
				console.log(err);
			}
			console.log(result.args);
			saveProduct(result.args);
		});
	});
}

function saveProduct(product) {
	ProductModel.findOne({ productId: product._productId.toNumber() }, function(err, dbProduct) {
		// if exist we dont save
		if (dbProduct != null) {
			return;
		}

		var p = new ProductModel({
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

		p.save(function(error) {
			if (error) {
				console.log(error);
			} else {
				ProductModel.countDocuments({}, function(err, count) {
					console.log("there is " + count);
				});
			}
		});
	});
}