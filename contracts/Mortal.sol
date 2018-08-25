pragma solidity ^0.4.23;

import "contracts/Ownable.sol";

contract mortal is ownable {

    /* Function to recover the funds on the contract */
    function kill() public onlyOwner() {
        selfdestruct(owner);
    }

}
