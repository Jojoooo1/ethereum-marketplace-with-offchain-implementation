EcommerceStore = artifacts.require("./EcommerceStore.sol");
module.exports = function(callback) {
  EcommerceStore.deployed().then(function(f) {
    f.addAdmin(web3.eth.accounts[1], { from: web3.eth.accounts[0], gas: 200000 }).then(function(f) {
      console.log(f);
    });
  });

  EcommerceStore.deployed().then(function(f) {
    f.addStore("name: store1", "category: 1", "imageLink: test", "descriptionLink: test", { from: web3.eth.accounts[0], gas: 200000 }).then(function(
      f
    ) {
      console.log(f);
    });
  });

  EcommerceStore.deployed().then(function(f) {
    f.addStore("name: store1", "category: 1", "imageLink: test", "descriptionLink: test", { from: web3.eth.accounts[8], gas: 200000 }).then(function(
      f
    ) {
      console.log(f);
    });
  });

  EcommerceStore.deployed().then(function(f) {
    f.addStore("name: store2", "category: 1", "imageLink: test", "descriptionLink: test", { from: web3.eth.accounts[9], gas: 200000 }).then(function(
      f
    ) {
      console.log(f);
    });
  });

  setTimeout(function() {
    EcommerceStore.deployed().then(function(f) {
      f.approveStore(web3.eth.accounts[0], { from: web3.eth.accounts[0] }).then(function(f) {
        console.log(f);
      });
    });

    EcommerceStore.deployed().then(function(f) {
      f.approveStore(web3.eth.accounts[9], { from: web3.eth.accounts[0] }).then(function(f) {
        console.log(f);
      });
    });

    EcommerceStore.deployed().then(function(f) {
      f.addProductToStore("name: product1", "category: clothes", 3, "imageLink: test", "descriptionLink: test", web3.toWei(2), {
        from: web3.eth.accounts[0],
        gas: 2000000
      }).then(function(f) {
        console.log(f);
      });
    });

    EcommerceStore.deployed().then(function(f) {
      f.addProductToStore("name: product2", "category: clothes", 3, "imageLink: test", "descriptionLink: test", web3.toWei(2), {
        from: web3.eth.accounts[0],
        gas: 2000000
      }).then(function(f) {
        console.log(f);
      });
    });

    EcommerceStore.deployed().then(function(f) {
      f.addProductToStore("name: product3", "category: clothes", 3, "imageLink: test", "descriptionLink: test", web3.toWei(2), {
        from: web3.eth.accounts[0],
        gas: 2000000
      }).then(function(f) {
        console.log(f);
      });
    });

    EcommerceStore.deployed().then(function(f) {
      f.addProductToStore("name: product4", "category: clothes", 3, "imageLink: test", "descriptionLink: test", web3.toWei(2), {
        from: web3.eth.accounts[0],
        gas: 2000000
      }).then(function(f) {
        console.log(f);
      });
    });

    EcommerceStore.deployed().then(function(f) {
      f.addProductToStore("name: product5", "category: clothes", 3, "imageLink: test", "descriptionLink: test", web3.toWei(2), {
        from: web3.eth.accounts[9],
        gas: 2000000
      }).then(function(f) {
        console.log(f);
      });
    });
    EcommerceStore.deployed().then(function(f) {
      f.addProductToStore("name: product6", "category: clothes", 3, "imageLink: test", "descriptionLink: test", web3.toWei(2), {
        from: web3.eth.accounts[9],
        gas: 2000000
      }).then(function(f) {
        console.log(f);
      });
    });
    EcommerceStore.deployed().then(function(f) {
      f.addProductToStore("name: product7", "category: clothes", 3, "imageLink: test", "descriptionLink: test", web3.toWei(2), {
        from: web3.eth.accounts[9],
        gas: 2000000
      }).then(function(f) {
        console.log(f);
      });
    });
    EcommerceStore.deployed().then(function(f) {
      f.addProductToStore("name: product0", "category: clothes", 3, "imageLink: test", "descriptionLink: test", web3.toWei(2), {
        from: web3.eth.accounts[9],
        gas: 2000000
      }).then(function(f) {
        console.log(f);
      });
    });

    EcommerceStore.deployed().then(function(f) {
      f.newOrder(web3.eth.accounts[0], 1, 1, "test", { from: web3.eth.accounts[2], value: web3.toWei(2), gas: 4000000 })
        .then(function(f) {
          console.log(f);
        })
        .catch(function(e) {
          console.log(e);
        });
    });

    EcommerceStore.deployed().then(function(f) {
      f.newOrder(web3.eth.accounts[0], 1, 1, "test", { from: web3.eth.accounts[2], value: web3.toWei(2), gas: 4000000 })
        .then(function(f) {
          console.log(f);
        })
        .catch(function(e) {
          console.log(e);
        });
    });
  }, 2000);
};
