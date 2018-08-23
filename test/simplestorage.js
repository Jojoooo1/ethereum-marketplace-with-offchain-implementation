var SimpleStorage = artifacts.require("./SimpleStorage.sol");

contract('SimpleStorage', function(accounts) {

  it("...should store the value 89.", function() {
    return SimpleStorage.deployed().then(function(instance) {
      simpleStorageInstance = instance;

      return simpleStorageInstance.set(89, {from: accounts[0]});
    }).then(function() {
      return simpleStorageInstance.get();
    }).then(function(storedData) {
      assert.equal(storedData, 89, "The value 89 was not stored.");
    });
  });
});


EcommerceStore.deployed().then(function(f){f.addAdmin(web3.eth.accounts[1], {from: web3.eth.accounts[0], gas: 200000}).then(function(f){console.log(f)})})
EcommerceStore.deployed().then(function(f){f.admins(web3.eth.accounts[2]).then(function(f){console.log(f)})})
EcommerceStore.deployed().then(function(f){f.removeAdmin(web3.eth.accounts[2], {from: web3.eth.accounts[0], gas: 200000}).then(function(f){console.log(f)})})

EcommerceStore.deployed().then(function(f){f.addStore("name: store1", "category: 1", "imageLink: test", "descriptionLink: test", {from: web3.eth.accounts[4], gas: 200000}).then(function(f){console.log(f)})})
EcommerceStore.deployed().then(function(f){f.addStore("name: store2", "category: 2", "imageLink: test", "descriptionLink: test", {from: web3.eth.accounts[5], gas: 200000}).then(function(f){console.log(f)})})
EcommerceStore.deployed().then(function(f){f.updateStore("name: CHANGED", "category: CHANGED", "imageLink: test", "descriptionLink: test", {from: web3.eth.accounts[4], gas: 200000}).then(function(f){console.log(f)})})

EcommerceStore.deployed().then(function(f){f.stores(web3.eth.accounts[4]).then(function(f){console.log(f)})})

// test require
EcommerceStore.deployed().then(function(f){f.approveStore(web3.eth.accounts[4], {from: web3.eth.accounts[0]}).then(function(f){console.log(f)})})

EcommerceStore.deployed().then(function(f){f.approvedStores(web3.eth.accounts[4], {from: web3.eth.accounts[0]}).then(function(f){console.log(f)})})



EcommerceStore.deployed().then(function(f){f.addProductToStore("name: product1", "category: clothes", 3, "imageLink: test", "descriptionLink: test", web3.toWei(2), {from: web3.eth.accounts[4], gas: 2000000}).then(function(f){console.log(f)})})

EcommerceStore.deployed().then(function(f){f.addProductToStore("name: product2", "category: Informatics", 3, "imageLink: test", "descriptionLink: test", web3.toWei(2), {from: web3.eth.accounts[4], gas: 2000000}).then(function(f){console.log(f)})})
EcommerceStore.deployed().then(function(f){f.addProductToStore("name: product3", "category: whatever", 3, "imageLink: test", "descriptionLink: test", web3.toWei(2), {from: web3.eth.accounts[4], gas: 2000000}).then(function(f){console.log(f)})})


EcommerceStore.deployed().then(function(f){f.products(web3.eth.accounts[4], 1).then(function(f){console.log(f)})})
EcommerceStore.deployed().then(function(f){f.updateProduct(1, "name: NEW", "category: clothes", 3, "imageLink: test", "descriptionLink: test", web3.toWei(2), {from: web3.eth.accounts[4], gas: 2000000}).then(function(f){console.log(f)})})

EcommerceStore.deployed().then(function(f){f.removeProductFromStore(3 ,{from: web3.eth.accounts[4], gas: 200000}).then(function(f){console.log(f)})})


EcommerceStore.deployed().then(function(f){f.newOrder(web3.eth.accounts[4], 1, 1, "test", {from: web3.eth.accounts[6], value: web3.toWei(2), gas: 2000000}).then(function(f){console.log(f)}).catch(function(e){console.log(e)})})

EcommerceStore.deployed().then(function(f){f.escrowInfo(1).then(function(f){console.log(f)}).catch(function(e){console.log(e)})})


EcommerceStore.deployed().then(function(f){f.releaseAmountToSeller({from: web3.eth.accounts[4]}).then(function(f){console.log(f)})})

EcommerceStore.deployed().then(function(f){f.releaseAmountToSeller({from: web3.eth.accounts[6]}).then(function(f){console.log(f)})})


EcommerceStore.deployed().then(function(f){f.products(web3.eth.accounts[4], 1).then(function(f){console.log(f)})})

