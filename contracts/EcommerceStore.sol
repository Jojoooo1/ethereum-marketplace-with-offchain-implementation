pragma solidity ^0.4.23;

import "./Escrow.sol";

contract EcommerceStore {

    enum ProductCondition{New, Used}

    uint public productIndex;
    address public arbiter;

    // Check if address is admin
    mapping(address => bool) public admins;
    // Allow to see all admins
    address[] adminsArray ;

    // used for finding easily a store based on a productId
    mapping(address => mapping(uint => Product)) stores;
    mapping(uint => address) productIdInStore;

    // hosted store informations
    mapping(address => StoreDetails) storesDetails;

    // productId mapping the address of the escrow contract
    mapping(uint => address) productEscrow;

    struct StoreDetails {
        string name;
        string category;
        string imageHashLink;
        string descriptionHashLink;
    }

    struct Product {
        uint id;
        string name;
        string category;
        uint quantity;
        string imageLink;
        string descriptionLink;
        uint startTime;
        uint256 price;
        ProductCondition condition;
        address buyer;
    }

    event NewProduct(uint _productId, string _name, string _category,  uint _quantity, string _imageLink, string _descriptionLink, uint _startTime, uint256 _price, uint _productCondition);

    constructor() public {
        admins[msg.sender] = true;
        adminsArray.push(msg.sender);
        productIndex = 0;
        arbiter = msg.sender;
    }

    function addAdmin(address _address)
    public
    returns(address, bool)
    {
      require(admins[msg.sender] == true);
      admins[_address] = true;
      adminsArray.push(_address);
      return (_address, admins[_address]);
    }

    function removeAdmin(address _address,uint  _index)
    public
    returns(address, bool)
    {
      require(admins[msg.sender] == true);
      require(adminsArray.length > 1);
      admins[_address] = false;
      delete adminsArray[_index];
      resizeArrayAfterRemove(_index);
      // removeAdmin(_index);
      return(_address, admins[_address]);
    }

    function getAdmins()
    view
    public
    returns(address[])
    {
        return adminsArray;
    }


    // function addStore()
    // function removeStore()
    // function updateStore()

    function addProductToStore(string _name, string _category, uint _quantity, string _imageLink, string _descriptionLink, uint _startTime, uint256 _price, uint _productCondition)
    public
    {
        Product memory product = Product(productIndex, _name, _category, 1, _imageLink, _descriptionLink, _startTime, _price, ProductCondition(_productCondition), 0);
        stores[msg.sender][productIndex] = product;
        productIdInStore[productIndex] = msg.sender;
        emit NewProduct(productIndex, _name, _category, 1, _imageLink, _descriptionLink, _startTime, _price, _productCondition);
        productIndex += 1;
    }

    // function updateProduct()
    // function removeProductFromStore()

    function getProduct(uint productId)
    public
    view
    returns (uint, string, string, uint, string, string, uint, uint256, ProductCondition, address) // uint
    {
      Product memory product = stores[productIdInStore[productId]][productId];
      return (product.id, product.name, product.category, product.quantity, product.imageLink, product.descriptionLink, product.startTime, product.price, product.condition, product.buyer);
  }


  function buyProduct(uint _productId)
  payable
  public
  {
    Product memory product = stores[productIdInStore[_productId]][_productId];
    require(product.buyer == address(0));
    require(msg.value >= product.price);
    product.buyer = msg.sender;
    product.quantity -= 1;
    stores[productIdInStore[_productId]][_productId] = product;
    Escrow escrow = (new Escrow).value(msg.value)(_productId, msg.sender, productIdInStore[_productId], arbiter);
    productEscrow[_productId] = escrow;
}

function escrowInfo(uint _productId)
view
public
returns (address, address, address, bool, uint, uint)
{
    return Escrow(productEscrow[_productId]).escrowInfo();
}

function releaseAmountToSeller(uint _productId)
public
{
    return Escrow(productEscrow[_productId]).releaseAmountToSeller(msg.sender);
}

function releaseAmountToBuyer(uint _productId)
public {

    return Escrow(productEscrow[_productId]).releaseAmountToBuyer(msg.sender);
}

    function resizeArrayAfterRemove(uint index)
    returns(address[])
    {
        if (index >= adminsArray.length) return;

        for (uint i = index; i<adminsArray.length-1; i++){
            adminsArray[i] = adminsArray[i+1];
        }
        delete adminsArray[adminsArray.length-1];
        adminsArray.length--;
        return adminsArray;
    }

}

