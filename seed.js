EcommerceStore = artifacts.require("./EcommerceStore.sol");
category = ["Art", "Books", "High-Tech", "Clothing", "Sport"];

module.exports = function(callback) {
  EcommerceStore.deployed().then(function(f) {
    f.addAdmin(web3.eth.accounts[1], { from: web3.eth.accounts[0], gas: 200000 }).then(function(f) {
      console.log(f);
    });
  });

  EcommerceStore.deployed().then(function(f) {
    f.addStore("Store 1", category[0], "", "", { from: web3.eth.accounts[0], gas: 200000 }).then(function(f) {
      console.log(f);
    });
  });

  EcommerceStore.deployed().then(function(f) {
    f.addStore("Store 2", category[1], "", "", { from: web3.eth.accounts[8], gas: 200000 }).then(function(f) {
      console.log(f);
    });
  });

  EcommerceStore.deployed().then(function(f) {
    f.addStore("Store 3", category[2], "", "", { from: web3.eth.accounts[9], gas: 200000 }).then(function(f) {
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
      f.addProduct("product 1", category[1], 3, "", "", web3.toWei(2), {
        from: web3.eth.accounts[0],
        gas: 2000000
      }).then(function(f) {
        console.log(f);
      });
    });

    EcommerceStore.deployed().then(function(f) {
      f.addProduct("product 2", category[3], 5, "", "", web3.toWei(2), {
        from: web3.eth.accounts[0],
        gas: 2000000
      }).then(function(f) {
        console.log(f);
      });
    });

    EcommerceStore.deployed().then(function(f) {
      f.addProduct("product 3", category[4], 1, "", "", web3.toWei(2), {
        from: web3.eth.accounts[0],
        gas: 2000000
      }).then(function(f) {
        console.log(f);
      });
    });

    EcommerceStore.deployed().then(function(f) {
      f.addProduct("product 4", category[2], 6, "", "", web3.toWei(2), {
        from: web3.eth.accounts[0],
        gas: 2000000
      }).then(function(f) {
        console.log(f);
      });
    });

    EcommerceStore.deployed().then(function(f) {
      f.addProduct("product 5", category[3], 7, "", "", web3.toWei(2), {
        from: web3.eth.accounts[9],
        gas: 2000000
      }).then(function(f) {
        console.log(f);
      });
    });
    EcommerceStore.deployed().then(function(f) {
      f.addProduct("product 6", category[2], 10, "", "", web3.toWei(2), {
        from: web3.eth.accounts[9],
        gas: 2000000
      }).then(function(f) {
        console.log(f);
      });
    });
    EcommerceStore.deployed().then(function(f) {
      f.addProduct("product 7", category[1], 2, "", "", web3.toWei(2), {
        from: web3.eth.accounts[9],
        gas: 2000000
      }).then(function(f) {
        console.log(f);
      });
    });
    EcommerceStore.deployed().then(function(f) {
      f.addProduct("product 8", category[1], 2, "", "", web3.toWei(2), {
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

    EcommerceStore.deployed().then(function(f) {
      f.newOrder(web3.eth.accounts[9], 6, 1, "test", { from: web3.eth.accounts[0], value: web3.toWei(2), gas: 4000000 })
        .then(function(f) {
          console.log(f);
        })
        .catch(function(e) {
          console.log(e);
        });
    });
  }, 2000);
};
