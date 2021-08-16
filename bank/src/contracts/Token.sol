// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
  // minter variable
  address public minter;

  // minter changed event
  event MinterRole(address indexed from, address to);

  constructor() public payable ERC20("Decentralized Bank Currency", "DCB") {
    minter = msg.sender;
    //asign initial minter
  }

  // pass minter role function
  function passMinterRole(address bank) public returns(bool) {
    require(msg.sender == minter, 'Error, only owner can change pass minter role ');
    minter = bank;

    emit MinterRole(msg.sender, bank);
    return true;
  }

  function mint(address account, uint256 amount) public {
    //check if msg.sender have minter role
    require(msg.sender == minter, 'Error, msg.sender dous not have minter role');   // bank
		_mint(account, amount);
	}
}

