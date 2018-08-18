EcommerceStore = artifacts.require("./EcommerceStore.sol");
module.exports = function(callback) {
  current_time = Math.round(new Date() / 1000);
  amt_1 = web3.toWei(1, "ether");
  amt_2 = web3.toWei(2, "ether");
  amt_3 = web3.toWei(3, "ether");
  amt_half = web3.toWei(0.5, "ether");
  amt_tenth = web3.toWei(0.1, "ether");

  EcommerceStore.deployed().then(function(i) {
    i.addProductToStore(
      "iPhone 7",
      "Cell Phones & Accessories",
      1,
      "QmZ8aZRoDdYcypXpo13y5uvyHXa5cqDHxtaFuYCStMWPzM",
      "QmRf22bZar3WKmojipms22PkXH1MZGmvsqzQtuSvQE3uhm",
      current_time,
      2 * amt_1,
      0
    ).then(function(f) {
      console.log(f);
    });
  });
  EcommerceStore.deployed().then(function(i) {
    i.addProductToStore("Antique Carpet", "Art", 1, "QmZ8aZRoDdYcypXpo13y5uvyHXa5cqDHxtaFuYCStMWPzM", "QmRf22bZar3WKmojipms22PkXH1MZGmvsqzQtuSvQE3uhm", current_time, amt_2, 0).then(function(f) {
      console.log(f);
    });
  });
  EcommerceStore.deployed().then(function(i) {
    i.addProductToStore("Shirt", "Clothing", 1, "QmZ8aZRoDdYcypXpo13y5uvyHXa5cqDHxtaFuYCStMWPzM", "QmRf22bZar3WKmojipms22PkXH1MZGmvsqzQtuSvQE3uhm", current_time, amt_tenth, 0).then(function(f) {
      console.log(f);
    });
  });
  EcommerceStore.deployed().then(function(i) {
    i.addProductToStore("Women Jacket", "Clothing", 1, "QmZ8aZRoDdYcypXpo13y5uvyHXa5cqDHxtaFuYCStMWPzM", "QmRf22bZar3WKmojipms22PkXH1MZGmvsqzQtuSvQE3uhm", current_time, amt_half, 0).then(function(f) {
      console.log(f);
    });
  });
  EcommerceStore.deployed().then(function(i) {
    i.addProductToStore("Hydra Laptop", "Computers & Tablets", 1, "QmZ8aZRoDdYcypXpo13y5uvyHXa5cqDHxtaFuYCStMWPzM", "QmRf22bZar3WKmojipms22PkXH1MZGmvsqzQtuSvQE3uhm", current_time, amt_2, 0).then(
      function(f) {
        console.log(f);
      }
    );
  });
  EcommerceStore.deployed().then(function(i) {
    i.addProductToStore("iPad", "Computers & Tablets", 1, "QmZ8aZRoDdYcypXpo13y5uvyHXa5cqDHxtaFuYCStMWPzM", "QmRf22bZar3WKmojipms22PkXH1MZGmvsqzQtuSvQE3uhm", current_time, amt_2, 0).then(function(f) {
      console.log(f);
    });
  });
  EcommerceStore.deployed().then(function(i) {
    i.addProductToStore("Macbook Pro", "Computers & Tablets", 1, "QmZ8aZRoDdYcypXpo13y5uvyHXa5cqDHxtaFuYCStMWPzM", "QmRf22bZar3WKmojipms22PkXH1MZGmvsqzQtuSvQE3uhm", current_time, amt_2, 0).then(
      function(f) {
        console.log(f);
      }
    );
  });
  EcommerceStore.deployed().then(function(i) {
    i.addProductToStore("Drone", "Cameras", 1, "QmZ8aZRoDdYcypXpo13y5uvyHXa5cqDHxtaFuYCStMWPzM", "QmRf22bZar3WKmojipms22PkXH1MZGmvsqzQtuSvQE3uhm", current_time, amt_2, 0).then(function(f) {
      console.log(f);
    });
  });
  EcommerceStore.deployed().then(function(i) {
    i.addProductToStore("Nokia", "Cell Phones & Accessories", 1, "QmZ8aZRoDdYcypXpo13y5uvyHXa5cqDHxtaFuYCStMWPzM", "QmRf22bZar3WKmojipms22PkXH1MZGmvsqzQtuSvQE3uhm", current_time, amt_3, 0).then(
      function(f) {
        console.log(f);
      }
    );
  });
  EcommerceStore.deployed().then(function(i) {
    i.addProductToStore("Cryptonomicon", "Books", 1, "QmZ8aZRoDdYcypXpo13y5uvyHXa5cqDHxtaFuYCStMWPzM", "QmRf22bZar3WKmojipms22PkXH1MZGmvsqzQtuSvQE3uhm", current_time, amt_2, 0).then(function(f) {
      console.log(f);
    });
  });
};
