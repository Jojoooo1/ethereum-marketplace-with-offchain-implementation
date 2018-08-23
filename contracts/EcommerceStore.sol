pragma solidity ^0.4.23;

import "contracts/Escrow.sol";

contract EcommerceStore {

  enum OrderStatus{Payed, Delivered}

  uint public storeIndex;
  uint public productIndex;
  uint public orderIndex;
  address public arbiter;

  // Check if address is admin
  mapping(address => bool) public admins;

  // Store details
  mapping(address => Store) public stores;
  mapping(address => bool) public approvedStores;

  // used for finding easily a store based on a productId
  mapping(address => mapping(uint => Product)) public products;
  mapping(uint => address) public productIdInStore;


  mapping(address => mapping(uint => Order)) public orders;
  mapping(uint => address) public orderIdForBuyer;

  // productId mapping the address of the escrow contract
  mapping(uint => address) public productEscrow;

  struct Store {
    uint id;
    string name;
    string category;
    string imageLink;
    string descriptionLink;
  }

  struct Product {
    uint id;
    string name;
    string category;
    uint quantity;
    string imageLink;
    string descriptionLink;
    uint256 price;
  }

  struct Order {
    uint id;
    uint productId;
    uint quantity;
    string orderAddress;
    OrderStatus status;
  }

  modifier onlyAdmin() {
    require (admins[msg.sender] == true);
    _;
  }

  // check if work
  modifier onlyStoreOwner() {
    require (stores[msg.sender].id > 0);
    _;
  }

  // check if work
  modifier onlyAdminOrStoreOwner() {
    require (admins[msg.sender] == true || stores[msg.sender].id > 0);
    _;
  }

  modifier onlyProductOwner(uint _id) {
    require (msg.sender == productIdInStore[_id]);
    _;
  }

  modifier storeNotExist() {
    require (stores[msg.sender].id == 0);
    _;
  }

  modifier onlyApprovedStores() {
    require (approvedStores[msg.sender] == true);
    _;
  }

  modifier productExist(uint _id) {
    require (productIdInStore[_id] != 0x0000000000000000000000000000000000000000);
    _;
  }

  modifier productHasEnoughtQuantity(address _storeAddress, uint _productId, uint _orderQuantity) {
    require (products[_storeAddress][_productId].quantity >= _orderQuantity);
    _;
  }

  modifier OrderPriceIsEnought(address _storeAddress, uint _productId, uint _orderQuantity) {
    require (msg.value >= (products[_storeAddress][_productId].quantity * _orderQuantity));
    _;
  }


  event NewAdmin(address _address);
  event AdminDeleted(address _address);

  event NewStore(uint _id, address _address, string _name, string _category, string _imageLink, string _descriptionLink);
  event StoreUpdated(uint _id, address _address, string _name, string _category, string _imageLink, string _descriptionLink);
  event StoreRemoved(address _address, uint _id);
  event StoreApproved(address _address);

  event NewProduct(address _storeAddress, uint _storeId, uint _id, string _name, string _category,  uint _quantity, string _imageLink, string _descriptionLink, uint256 _price);
  event ProductUpdated(uint _id, string _name, string _category,  uint _quantity, string _imageLink, string _descriptionLink, uint256 _price);
  event ProductRemoved(uint _id);

  event NewOrder(address _buyer,address _seller, uint _id, uint _productId, uint _quantity, string _orderAddress, OrderStatus _orderStatus);

  constructor() public {
    admins[msg.sender] = true;
    emit NewAdmin(msg.sender);
    productIndex = 1;
    storeIndex = 1;
    orderIndex = 1;
    arbiter = msg.sender;
  }

  function addAdmin(address _address)
  public
  onlyAdmin
  {
    admins[_address] = true;
    emit NewAdmin(_address);
  }

  function removeAdmin(address _address)
  public
  onlyAdmin
  {
    require(admins[_address]);
    admins[_address] = false;
    emit AdminDeleted(_address);
  }

  function addStore(string _name, string _category, string _imageLink, string _descriptionLink)
  public
  storeNotExist
  {
    Store memory store = Store(storeIndex, _name, _category, _imageLink, _descriptionLink);
    stores[msg.sender] = store;
    emit NewStore(storeIndex, msg.sender, _name, _category, _imageLink, _descriptionLink);
    storeIndex += 1;
  }

  function removeStore(address _address)
  public
  onlyAdminOrStoreOwner
  {
    address storeAddress;
    uint storeId;
    if (admins[msg.sender]) {
      if(approvedStores[_address]) {
        delete approvedStores[_address];
        removeAllProductFromStore(_address);
      }
      storeAddress = _address;
      if (stores[_address].id > 0) {
        storeId = stores[_address].id;
      }
      else {
        storeId = 0;
      }
      delete stores[_address];
    }
    else if (approvedStores[msg.sender]) {
      delete approvedStores[msg.sender];
      removeAllProductFromStore(msg.sender);
      storeAddress = msg.sender;
      storeId = stores[msg.sender].id;
      delete stores[msg.sender];
    }
    emit StoreRemoved(storeAddress, storeId);
  }

  function updateStore(string _name, string _category, string _imageLink, string _descriptionLink)
  public
  onlyStoreOwner
  {
    uint storeId = stores[msg.sender].id;
    Store memory store = Store(storeId, _name, _category, _imageLink, _descriptionLink);
    stores[msg.sender] = store;
    emit StoreUpdated(storeId, msg.sender, _name, _category, _imageLink, _descriptionLink);
  }

  function approveStore(address _address)
  public
  onlyAdmin
  {
    approvedStores[_address] = true;
    emit StoreApproved(_address);
  }

  function addProductToStore(string _name, string _category, uint _quantity, string _imageLink, string _descriptionLink, uint256 _price)
  public
  onlyApprovedStores
  {
    Product memory product = Product(productIndex, _name, _category, _quantity, _imageLink, _descriptionLink, _price);
    products[msg.sender][productIndex] = product;
    productIdInStore[productIndex] = msg.sender;
    emit NewProduct(msg.sender, stores[msg.sender].id, productIndex, _name, _category, _quantity, _imageLink, _descriptionLink, _price);
    productIndex += 1;
  }

  function updateProduct(uint _productId, string _name, string _category, uint _quantity, string _imageLink, string _descriptionLink, uint256 _price)
  public
  onlyProductOwner(_productId)
  productExist(_productId)
  {
    Product memory product = Product(_productId, _name, _category, _quantity, _imageLink, _descriptionLink, _price);
    products[msg.sender][_productId] = product;
    emit ProductUpdated(_productId, _name, _category, _quantity, _imageLink, _descriptionLink, _price);
  }

  function removeProductFromStore(uint _productId)
  public
  onlyProductOwner(_productId)
  productExist(_productId)
  {
    delete products[msg.sender][_productId];
    delete productIdInStore[productIndex];
    emit ProductRemoved(_productId);
  }

  function removeAllProductFromStore(address _storeAddress)
  internal
  {
    for (uint i=1; i<=productIndex; i++) {
      if (productIdInStore[i] == _storeAddress) {
        delete productIdInStore[i];
        delete products[_storeAddress][i];
      }
    }
  }
  // payable
  function newOrder(address _storeAddress, uint _productId, uint _quantity, string _orderAddress)
  payable
  public
  productExist(_productId)
  productHasEnoughtQuantity(_storeAddress, _productId, _quantity)
  OrderPriceIsEnought(_storeAddress, _productId, _quantity)
  {
    Order memory order = Order(orderIndex, _productId, _quantity, _orderAddress, OrderStatus.Payed);
    orders[msg.sender][orderIndex] = order;
    orderIdForBuyer[orderIndex] = msg.sender;
    products[_storeAddress][_productId].quantity -= _quantity;
    Escrow escrow = (new Escrow).value(msg.value)(orderIndex, msg.sender, _storeAddress, arbiter);
    productEscrow[orderIndex] = escrow;
    emit NewOrder(msg.sender, _storeAddress, orderIndex, _productId, _quantity, _orderAddress, OrderStatus.Payed);
    orderIndex += 1;
  }

  function escrowInfo(uint _orderId)
  view
  public
  returns (address, address, address, bool, uint, uint)
  {
    return Escrow(productEscrow[_orderId]).escrowInfo();
  }

  function releaseAmountToSeller(uint _orderId)
  public
  {
    return Escrow(productEscrow[_orderId]).releaseAmountToSeller(msg.sender);
  }

  function releaseAmountToBuyer(uint _orderId)
  public {

    return Escrow(productEscrow[_orderId]).releaseAmountToBuyer(msg.sender);
  }

}

