pragma solidity ^0.4.23;


import "contracts/Ownable.sol";
import "contracts/Mortal.sol";
import "contracts/CircuitBreaker.sol";
import 'contracts/SafeMath.sol';
import "contracts/Escrow.sol";

contract EcommerceStore is ownable, mortal, circuitBreaker {

  using SafeMath for uint256;

  enum OrderStatus{CREATED, PAYED}

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
    require (admins[msg.sender] == true, "only admin");
    _;
  }

  modifier onlyStoreOwner() {
    require (stores[msg.sender].id > 0, "only store owner");
    _;
  }

  modifier onlyAdminOrStoreOwner() {
    require (admins[msg.sender] == true || stores[msg.sender].id > 0, "only admin or store owner");
    _;
  }

  modifier onlyProductOwner(uint _id) {
    require (msg.sender == productIdInStore[_id], "only store owner");
    _;
  }

  modifier storeNotExist() {
    require (stores[msg.sender].id == 0, "store do not exist");
    _;
  }

  modifier onlyApprovedStores() {
    require (approvedStores[msg.sender] == true, "store not approved");
    _;
  }

  modifier productExist(uint _id) {
    require (productIdInStore[_id] != address(0x0), "product do not exist");
    _;
  }

  modifier productHasEnoughtQuantity(uint _productId, uint _orderQuantity) {
    require (products[productIdInStore[_productId]][_productId].quantity >= _orderQuantity && _orderQuantity != 0, "quantity is too low");
    _;
  }

  modifier OrderPriceIsEnought(uint _productId, uint _orderQuantity) {
    require (msg.value >= SafeMath.mul(products[productIdInStore[_productId]][_productId].quantity, _orderQuantity), "price is too low");
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

  event NewOrder(address _buyer,address _seller, uint _id, uint _productId, uint _quantity, string _orderAddress,address _arbiter);

  event FundReleaseToSeller(address _caller, uint _orderId, bool _fundDisbursed);
  event FundReleaseToBuyer(address _caller, uint _orderId, bool _fundDisbursed);

  constructor(address _arbiter) public {
    admins[msg.sender] = true;
    emit NewAdmin(msg.sender);
    productIndex = 1;
    storeIndex = 1;
    orderIndex = 1;
    arbiter = _arbiter;
  }

  function changeArbiter(address _address)
  public
  onlyOwner
  {
    arbiter = _address;
  }

  function addAdmin(address _address)
  public
  stopInEmergency
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
  stopInEmergency
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
  stopInEmergency
  onlyAdmin
  {
    approvedStores[_address] = true;
    emit StoreApproved(_address);
  }

  function addProduct(string _name, string _category, uint _quantity, string _imageLink, string _descriptionLink, uint256 _price)
  public
  stopInEmergency
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
  {
    Product memory product = Product(_productId, _name, _category, _quantity, _imageLink, _descriptionLink, _price);
    products[msg.sender][_productId] = product;
    emit ProductUpdated(_productId, _name, _category, _quantity, _imageLink, _descriptionLink, _price);
  }

  function removeProduct(uint _productId)
  public
  onlyProductOwner(_productId)
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
  function newOrder(uint _productId, uint _quantity, string _orderAddress)
  payable
  public
  stopInEmergency
  productExist(_productId)
  productHasEnoughtQuantity(_productId, _quantity)
  OrderPriceIsEnought(_productId, _quantity)
  {
    Order memory order = Order(orderIndex, _productId, _quantity, _orderAddress, OrderStatus.CREATED);
    orders[msg.sender][orderIndex] = order;
    orderIdForBuyer[orderIndex] = msg.sender;
    products[productIdInStore[_productId]][_productId].quantity -= _quantity;
    Escrow escrow = (new Escrow).value(msg.value)(orderIndex, msg.sender, productIdInStore[_productId], arbiter);
    productEscrow[orderIndex] = escrow;
    emit NewOrder(msg.sender, productIdInStore[_productId], orderIndex, _productId, _quantity, _orderAddress, arbiter);
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
  stopInEmergency
  {
    bool disbursed = Escrow(productEscrow[_orderId]).releaseAmountToSeller(msg.sender);
    emit FundReleaseToSeller(msg.sender, _orderId, disbursed);
  }

  function releaseAmountToBuyer(uint _orderId)
  public
  stopInEmergency
  {
    bool disbursed = Escrow(productEscrow[_orderId]).releaseAmountToBuyer(msg.sender);
    emit FundReleaseToBuyer(msg.sender, _orderId, disbursed);
  }

}


