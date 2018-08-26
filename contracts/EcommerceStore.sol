pragma solidity ^0.4.23;


import "contracts/Ownable.sol";
import "contracts/Mortal.sol";
import "contracts/CircuitBreaker.sol";
import 'contracts/SafeMath.sol';
import "contracts/Escrow.sol";

contract EcommerceStore is ownable, mortal, circuitBreaker {

  using SafeMath for uint256;

  enum OrderStatus{CREATED, PAYED}

  // Store id, increase by one everytime a store is created
  uint public storeIndex;
  // product id, increase by one everytime a product is created
  uint public productIndex;
  // order id, increase by one everytime an order is created
  uint public orderIndex;
  // address of the escrow arbiter
  address public arbiter;

  // Mapping of admins addresses
  mapping(address => bool) public admins;

  // Mapping address of store details
  mapping(address => Store) public stores;
  // Mapping address of approved stores
  mapping(address => bool) public approvedStores;

  // Mapping address link to store address that give product details
  mapping(address => mapping(uint => Product)) public products;
  // Mapping of product id linked to store address
  mapping(uint => address) public productIdInStore;

  // Mapping address link to buyer address that give orders details
  mapping(address => mapping(uint => Order)) public orders;
  // Mapping of order id linked to buyer address
  mapping(uint => address) public orderIdForBuyer;

  // Mapping of order id linked to escrow contract address
  mapping(uint => address) public productEscrow;


  /**
  * Store struct
  *
  * id: Id of the store
  * name: Name of the store
  * category: Category of the store
  * imageLink: IPFS image hash location of the store
  * descriptionLink: IPFS description hash location of the store
  */
  struct Store {
    uint id;
    string name;
    string category;
    string imageLink;
    string descriptionLink;
  }

  /**
  * Product struct
  *
  * id: Id of the product
  * name: Name of the product
  * category: Category of the product
  * quantity: Quantity of the product
  * imageLink: PFS image hash location of the product
  * descriptionLink: IPFS description hash location of the product
  * price: price Price of the product
  */
  struct Product {
    uint id;
    string name;
    string category;
    uint quantity;
    string imageLink;
    string descriptionLink;
    uint256 price;
  }

  /**
  * Order struct
  *
  * id: Id of the order
  * productId: Id of related product ordered
  * quantity: Quantity of the product ordered
  * orderAddress: Shipment address where to be delivered
  * status: Status of the order
  */
  struct Order {
    uint id;
    uint productId;
    uint quantity;
    string orderAddress;
    OrderStatus status;
  }

  // Modifier only allowing admin to access the function
  modifier onlyAdmin() {
    require (admins[msg.sender] == true, "only admin");
    _;
  }

  // Modifier only allowing admin to access the function
  modifier onlyStoreOwner() {
    require (stores[msg.sender].id > 0, "only store owner");
    _;
  }

  // Modifier only allowing admin to access the function
  modifier onlyAdminOrStoreOwner() {
    require (admins[msg.sender] == true || stores[msg.sender].id > 0, "only admin or store owner");
    _;
  }

  // Modifier only allowing product owner to access the function
  modifier onlyProductOwner(uint _id) {
    require (msg.sender == productIdInStore[_id], "only store owner");
    _;
  }

  // Modifier verifying the store accessed exist
  modifier storeNotExist() {
    require (stores[msg.sender].id == 0, "store do not exist");
    _;
  }

  // Modifier only allowing approved store to access the function
  modifier onlyApprovedStores() {
    require (approvedStores[msg.sender] == true, "store not approved");
    _;
  }

  // Modifier verifying the product accessed exist
  modifier productExist(uint _id) {
    require (productIdInStore[_id] != address(0x0), "product do not exist");
    _;
  }

  // Modifier verifying the product accessed has enought quantity
  modifier productHasEnoughtQuantity(uint _productId, uint _orderQuantity) {
    require (products[productIdInStore[_productId]][_productId].quantity >= _orderQuantity && _orderQuantity != 0, "quantity is too low");
    _;
  }

  // Modifier verifying the price send by the buyer is enought to create an order of that product
  modifier OrderPriceIsEnought(uint _productId, uint _orderQuantity) {
    require (msg.value >= SafeMath.mul(products[productIdInStore[_productId]][_productId].quantity, _orderQuantity), "price is too low");
    _;
  }

  /** All event are emited after data modification of the smart contract
  * Events are enriched with additional data to create more meaningfull backend data
  * All event name are defined by a descriptive name
  */
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

  /**
  * Constructor setting initial data at smart contract creation
  *
  * @param _arbiter Address of the escrow arbiter
  */
  constructor(address _arbiter) public {
    admins[msg.sender] = true;
    emit NewAdmin(msg.sender);
    productIndex = 1;
    storeIndex = 1;
    orderIndex = 1;
    arbiter = _arbiter;
  }

  /**
  * Set arbiter address to a new one
  *
  * @param _address New address of arbiter
  */
  function changeArbiter(address _address)
  public
  onlyOwner
  {
    arbiter = _address;
  }

  /**
  * Add a new admin
  *
  * @param _address Address of the new admin
  */
  function addAdmin(address _address)
  public
  stopInEmergency
  onlyAdmin
  {
    admins[_address] = true;
    emit NewAdmin(_address);
  }

  /**
  * Remove an admin
  *
  * @param _address Address of the admin to be removed
  */
  function removeAdmin(address _address)
  public
  onlyAdmin
  {
    require(admins[_address]);
    admins[_address] = false;
    emit AdminDeleted(_address);
  }

  /**
  * Add a new store
  *
  * @param _name Name of the new store
  * @param _category Category of the new store
  * @param _imageLink IPFS image hash location of the new store
  * @param _descriptionLink IPFS description hash location of the new store
  */
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

  /**
  * Remove a store
  *
  * @param _address Address of the store to be removed
  */
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

  /**
  * Update an existing store
  *
  * @param _name Updated store name
  * @param _category Updated store category
  * @param _imageLink Updated store IPFS image hash location
  * @param _descriptionLink Updated store IPFS description hash location
  */
  function updateStore(string _name, string _category, string _imageLink, string _descriptionLink)
  public
  onlyStoreOwner
  {
    uint storeId = stores[msg.sender].id;
    Store memory store = Store(storeId, _name, _category, _imageLink, _descriptionLink);
    stores[msg.sender] = store;
    emit StoreUpdated(storeId, msg.sender, _name, _category, _imageLink, _descriptionLink);
  }

  /**
  * Approve a store
  *
  * @param _address Address of the store to be approved
  */
  function approveStore(address _address)
  public
  stopInEmergency
  onlyAdmin
  {
    approvedStores[_address] = true;
    emit StoreApproved(_address);
  }

  /**
  * Add a new product
  *
  * @param _name Name of the new product
  * @param _category Category of the new product
  * @param _quantity Quantity of the new product
  * @param _imageLink IPFS image hash location of the new product
  * @param _descriptionLink IPFS description hash location of the new product
  * @param _price Price of the new product
  */
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

  /**
  * Update a product
  *
  * @param _productId Id of product to be updated
  * @param _name Update name
  * @param _category Updated product category
  * @param _quantity Updated product quantity
  * @param _imageLink Updated product IPFS image hash location
  * @param _descriptionLink Updated product IPFS description hash location
  * @param _price Updated product price
  */
  function updateProduct(uint _productId, string _name, string _category, uint _quantity, string _imageLink, string _descriptionLink, uint256 _price)
  public
  stopInEmergency
  onlyProductOwner(_productId)
  {
    Product memory product = Product(_productId, _name, _category, _quantity, _imageLink, _descriptionLink, _price);
    products[msg.sender][_productId] = product;
    emit ProductUpdated(_productId, _name, _category, _quantity, _imageLink, _descriptionLink, _price);
  }

  /**
  * Remove a product
  *
  * @param _productId Id of product to be removed
  */
  function removeProduct(uint _productId)
  public
  onlyProductOwner(_productId)
  {
    delete products[msg.sender][_productId];
    delete productIdInStore[productIndex];
    emit ProductRemoved(_productId);
  }

  /**
  * Remove all product from a store
  *
  * @param _storeAddress Address of store from where all product should be removed
  */
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

  /**
  * Add a new order
  *
  * @param _productId Id of product being added to the order
  * @param _quantity Quantity of the product being added to the order
  * @param _orderAddress Address where the product should be shipped
  */
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

  /**
  * Get escrow contract informations
  *
  * @param _orderId Id of the order to access related escrow contract
  * @return address of the buyer
  * @return address of the seller
  * @return address of the arbiter arbiter
  * @return bool true if fund has been disbursed or false if not
  * @return uint count of participant that asked for releasing fund
  * @return uint count of participant that asked for refunding fund
  */
  function escrowInfo(uint _orderId)
  view
  public
  returns (address, address, address, bool, uint, uint)
  {
    return Escrow(productEscrow[_orderId]).escrowInfo();
  }

  /**
  * Release amount to seller
  *
  * @param _orderId  Id of the order to access related escrow contract to ask for fund to be released
  */
  function releaseAmountToSeller(uint _orderId)
  public
  stopInEmergency
  {
    bool disbursed = Escrow(productEscrow[_orderId]).releaseAmountToSeller(msg.sender);
    emit FundReleaseToSeller(msg.sender, _orderId, disbursed);
  }

  /**
  * Release amount to buyer
  *
  * @param _orderId  Id of the order to access related escrow contract to ask for fund to be refunded
  */
  function releaseAmountToBuyer(uint _orderId)
  public
  stopInEmergency
  {
    bool disbursed = Escrow(productEscrow[_orderId]).releaseAmountToBuyer(msg.sender);
    emit FundReleaseToBuyer(msg.sender, _orderId, disbursed);
  }

}


