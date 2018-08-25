pragma solidity ^0.4.23;

import "contracts/Ownable.sol";

contract circuitBreaker is ownable {

  bool private stopped = false;

  function toggleContractActive() onlyOwner() public
  {
    stopped = !stopped;
  }

  modifier stopInEmergency { if (!stopped) _ ;}
  modifier onlyInEmergency { if (stopped) _ ;}

}
