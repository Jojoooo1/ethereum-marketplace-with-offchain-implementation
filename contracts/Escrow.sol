pragma solidity ^0.4.23;

contract Escrow {

  address public buyer;
  address public seller;
  address public arbiter;
  uint public orderId;
  uint public amount;
  mapping(address => bool) releaseAmount;
  mapping(address => bool) refundAmount;
  uint public releaseCount;
  uint public refundCount;
  bool public fundsDisbursed;
  address public owner;

  constructor(uint _orderId, address _buyer, address _seller, address _arbiter) payable public {
    orderId = _orderId;
    buyer = _buyer;
    seller = _seller;
    arbiter = _arbiter;
    fundsDisbursed = false;
    amount = msg.value;
    owner = msg.sender;
  }

  function escrowInfo()
  view
  public
  returns (address, address, address, bool, uint, uint)
  {
    return (buyer, seller, arbiter, fundsDisbursed, releaseCount, refundCount);
  }

  function releaseAmountToSeller(address caller)
  public
  {
    require(owner == msg.sender);
    require(fundsDisbursed == false);
    if ((caller == buyer || caller == seller || caller == arbiter) && (releaseAmount[caller] != true)) {
      releaseAmount[caller] = true;
      releaseCount += 1;
    }
    if (releaseCount == 2) {
      seller.transfer(amount);
      fundsDisbursed = true;
    }
  }

  function releaseAmountToBuyer(address caller)
  public
  {
    require(owner == msg.sender);
    require(fundsDisbursed == false);
    if ((caller == buyer || caller == seller || caller == arbiter) && (refundAmount[caller] != true))  {
      refundAmount[caller] = true;
      refundCount += 1;
    }
    if (refundCount == 2) {
      buyer.transfer(amount);
      fundsDisbursed = true;
    }
  }
}
