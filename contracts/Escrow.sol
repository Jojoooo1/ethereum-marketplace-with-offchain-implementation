pragma solidity ^0.4.23;

contract Escrow {

  // Address of buyer's order
  address public buyer;
  // Address of seller's order
  address public seller;
  // Address of arbiter's order
  address public arbiter;

  // Id of the corresponding order
  uint public orderId;
  // Amount of the order
  uint public amount;
  // Mapping of address that asked to release fund
  mapping(address => bool) releaseAmount;
  // Mapping of address that asked to refund fund
  mapping(address => bool) refundAmount;
  // Number of people that asked to release fund
  uint public releaseCount;
  // Number of people that asked to refund fund
  uint public refundCount;
  // Boolean that indicate if fund has been release
  bool public fundDisbursed;
  // Address of EcommerceStore smart contract
  address public owner;

  /**
  * Constructor setting initial data at smart contract creation
  *
  * @param _orderId Id of the corresponding order
  * @param _buyer Address of the buyer
  * @param _seller Address of the seller
  * @param _arbiter Address of the escrow arbiter
  */
  constructor(uint _orderId, address _buyer, address _seller, address _arbiter) payable public {
    orderId = _orderId;
    buyer = _buyer;
    seller = _seller;
    arbiter = _arbiter;
    fundDisbursed = false;
    amount = msg.value;
    owner = msg.sender;
  }

  /**
  * Get escrow contract informations
  *
  * @return address of the buyer
  * @return address of the seller
  * @return address of the arbiter arbiter
  * @return bool true if fund has been disbursed or false if not
  * @return uint count of participant that asked for releasing fund
  * @return uint count of participant that asked for refunding fund
  */
  function escrowInfo()
  view
  public
  returns (address, address, address, bool, uint, uint)
  {
    return (buyer, seller, arbiter, fundDisbursed, releaseCount, refundCount);
  }

  /**
  * Caller allow fund to be release to seller
  *
  * @param caller Address of the caller
  */
  function releaseAmountToSeller(address caller)
  public
  returns(bool)
  {
    require(owner == msg.sender);
    require(fundDisbursed == false);
    if ((caller == buyer || caller == seller || caller == arbiter) && (releaseAmount[caller] != true)) {
      releaseAmount[caller] = true;
      releaseCount += 1;
    }
    if (releaseCount == 2) {
      seller.transfer(amount);
      fundDisbursed = true;
    }
    return(fundDisbursed);
  }

  /**
  * Caller allow fund to be release to buyer
  *
  * @param caller Address of the caller
  */
  function releaseAmountToBuyer(address caller)
  public
  returns(bool)
  {
    require(owner == msg.sender);
    require(fundDisbursed == false);
    if ((caller == buyer || caller == seller || caller == arbiter) && (refundAmount[caller] != true))  {
      refundAmount[caller] = true;
      refundCount += 1;
    }
    if (refundCount == 2) {
      buyer.transfer(amount);
      fundDisbursed = true;
    }
    return(fundDisbursed);
  }
}
