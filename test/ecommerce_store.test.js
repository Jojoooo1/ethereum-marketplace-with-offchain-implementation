var EcommerceStore = artifacts.require("./EcommerceStore.sol");

contract("EcommerceStore admin test", async accounts => {
  it("Smart contract can be stop by the circuit breaker pattern, testing adding an admin", async () => {
    let instance = await EcommerceStore.deployed();
    let toggleBreaker = await instance.toggleContractActive();
    let admin = await instance.addAdmin(web3.eth.accounts[7]);
    let isAdmin = await instance.admins(web3.eth.accounts[7]);
    await instance.toggleContractActive();
    assert.equal(isAdmin, false);
  });

  it("Admin can add an admin", async () => {
    let instance = await EcommerceStore.deployed();
    let AddAdmin = await instance.addAdmin(web3.eth.accounts[1]);
    let isAdmin = await instance.admins(web3.eth.accounts[1]);
    assert.equal(isAdmin, true);
  });

  it("User can not add an admin", async () => {
    let instance = await EcommerceStore.deployed();
    try {
      await instance.addAdmin(web3.eth.accounts[2], { from: web3.eth.accounts[5] });
    } catch (error) {
      assert.isAbove(error.message.search("only admin"), 0);
    }
  });

  it("User can not remove an admin", async () => {
    let instance = await EcommerceStore.deployed();
    try {
      await instance.removeAdmin(web3.eth.accounts[1], { from: web3.eth.accounts[5] });
    } catch (error) {
      assert.isAbove(error.message.search("only admin"), 0);
    }
  });

  it("Admin can remove an admin", async () => {
    let instance = await EcommerceStore.deployed();
    let AddAdmin = await instance.addAdmin(web3.eth.accounts[1]);
    let removedAdmin = await instance.removeAdmin(web3.eth.accounts[1]);
    let isAdmin = await instance.admins(web3.eth.accounts[1]);
    assert.equal(isAdmin, false);
  });
});

contract("EcommerceStore store test", async accounts => {
  it("User can register a store", async () => {
    let instance = await EcommerceStore.deployed();
    let addStore = await instance.addStore("Store 1", "book", "", "", { from: web3.eth.accounts[1] });
    let store = await instance.stores(web3.eth.accounts[1]);
    assert.equal(store[1], "Store 1");
  });

  it("User can not approve a store", async () => {
    let instance = await EcommerceStore.deployed();
    try {
      await instance.approveStore(web3.eth.accounts[1], { from: web3.eth.accounts[5] });
    } catch (error) {
      assert.isAbove(error.message.search("only admin"), 0);
    }
  });

  it("Admin can approve a store", async () => {
    let instance = await EcommerceStore.deployed();
    let approveStore = await instance.approveStore(web3.eth.accounts[1]);
    let isApproved = await instance.approvedStores(web3.eth.accounts[1]);
    assert.equal(isApproved, true);
  });

  it("user can remove his own store", async () => {
    let instance = await EcommerceStore.deployed();
    let addStore = await instance.addStore("Store 1", "book", "", "", { from: web3.eth.accounts[7] });
    let removeStore = instance.removeStore(web3.eth.accounts[7], { from: web3.eth.accounts[7] });
    let approvedStore = await instance.approvedStores(web3.eth.accounts[7]);
    assert.equal(approvedStore, false);
  });

  it("user can not remove other store", async () => {
    let instance = await EcommerceStore.deployed();
    try {
      await instance.removeStore(web3.eth.accounts[1], { from: web3.eth.accounts[5] });
    } catch (error) {
      assert.isAbove(error.message.search("only admin or store owner"), 0);
    }
  });

  it("Admin can remove a store", async () => {
    let instance = await EcommerceStore.deployed();
    let addStore = await instance.addStore("Store 1", "book", "", "", { from: web3.eth.accounts[2] });
    let approveStore = await instance.approveStore(web3.eth.accounts[2]);
    let removeStore = await instance.removeStore(web3.eth.accounts[2]);
    let isApproved = await instance.approvedStores(web3.eth.accounts[2]);
    assert.equal(isApproved, false);
  });

  it("Store not approved can not add a product", async () => {
    let instance = await EcommerceStore.deployed();
    let addProduct = await instance.addProduct("product", "Informatics", 7, "imageLink", "descriptionLink", web3.toWei(2), {
      from: web3.eth.accounts[1]
    });
    let productAddress = await instance.productIdInStore(1);
    assert.equal(productAddress, web3.eth.accounts[1]);
  });

  it("Store approved can add a product", async () => {
    let instance = await EcommerceStore.deployed();
    let addProduct = await instance.addProduct("product", "Informatics", 3, "imageLink", "descriptionLink", web3.toWei(2), {
      from: web3.eth.accounts[1]
    });
    let productAddress = await instance.productIdInStore(1);
    assert.equal(productAddress, web3.eth.accounts[1]);
  });

  it("Store 1 can update a product", async () => {
    let instance = await EcommerceStore.deployed();
    let updateProduct = await instance.updateProduct(1, "updated name", "Informatics", 3, "imageLink", "descriptionLink", web3.toWei(2), {
      from: web3.eth.accounts[1]
    });
    let product = await instance.products(web3.eth.accounts[1], 1);
    let name = product[1];
    assert.equal(name, "updated name");
  });

  it("Only store owner can update their product", async () => {
    let instance = await EcommerceStore.deployed();
    try {
      await instance.updateProduct(1, "updated name", "Informatics", 3, "imageLink", "descriptionLink", web3.toWei(2), {
        from: web3.eth.accounts[4]
      });
    } catch (error) {
      assert.isAbove(error.message.search("only store owner"), 0);
    }
  });

  it("Only existing product can be updated", async () => {
    let instance = await EcommerceStore.deployed();
    try {
      await instance.updateProduct(40, "updated name", "Informatics", 3, "imageLink", "descriptionLink", web3.toWei(2), {
        from: web3.eth.accounts[1]
      });
    } catch (error) {
      assert.isAbove(error.message.search("only store owner"), 0);
    }
  });

  it("Store owner can remove a product", async () => {
    let instance = await EcommerceStore.deployed();
    let addProduct = await instance.addProduct("product 2", "Informatics", 3, "imageLink", "descriptionLink", web3.toWei(2), {
      from: web3.eth.accounts[1]
    });
    let removeProduct = instance.removeProduct(2, {
      from: web3.eth.accounts[1]
    });
    let product = await instance.products(web3.eth.accounts[1], 2);
    let name = product[1];
    assert.equal(name, "");
  });

  it("User can not remove a product", async () => {
    let instance = await EcommerceStore.deployed();
    try {
      await instance.updateProduct(1, "updated name", "Informatics", 3, "imageLink", "descriptionLink", web3.toWei(2), {
        from: web3.eth.accounts[7]
      });
    } catch (error) {
      assert.isAbove(error.message.search("only store owner"), 0);
    }
  });

  it("User can create a new order", async () => {
    let instance = await EcommerceStore.deployed();
    let newOrder = await instance.newOrder(1, 1, "address n°1", { from: web3.eth.accounts[4], value: web3.toWei(2) });
    let orderAddress = await instance.orderIdForBuyer(1);
    assert.equal(orderAddress, web3.eth.accounts[4]);
  });

  it("Fund can be release to seller with arbiter", async () => {
    let instance = await EcommerceStore.deployed();
    let newOrder = await instance.newOrder(1, 1, "address n°1", { from: web3.eth.accounts[4], value: web3.toWei(2) });
    let releaseAmountToSellerFromBuyer = await instance.releaseAmountToSeller(2, { from: web3.eth.accounts[4] });
    let releaseAmountToSellerFromSeller = await instance.releaseAmountToSeller(2, { from: web3.eth.accounts[9] });
    let escrow = await instance.escrowInfo(2);
    assert.equal(escrow[3], true);
  });

  it("Fund can be release to buyer", async () => {
    let instance = await EcommerceStore.deployed();
    let newOrder = await instance.newOrder(1, 1, "address n°1", { from: web3.eth.accounts[4], value: web3.toWei(2) });
    let releaseAmountToBuyerFromBuyer = await instance.releaseAmountToBuyer(3, { from: web3.eth.accounts[4] });
    let releaseAmountToBuyerFromSeller = await instance.releaseAmountToBuyer(3, { from: web3.eth.accounts[1] });
    let escrow = await instance.escrowInfo(3);
    assert.equal(escrow[3], true);
  });
});
