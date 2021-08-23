// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

contract ArtKDevToken {

  // add Name
  string public name = 'ArtKDev';
  // add Synbol
  string public symbol = 'AKD';
  // add standart (my spacification)
  string public standard = 'ArtKDev Token v1.0';
  // add decimal
  uint8 public decimal = 4;
  uint public totalSupply;

  mapping(address => uint) internal balance;

  // Constractor
  constructor(uint256 _initialSupply) public {
    totalSupply = _initialSupply;
    // allocate the initial supply
    balance[msg.sender] = _initialSupply;
  }

  function balanceOf(
    address _owner
    ) public view returns(uint) {
    return balance[_owner];
  }

  // Transfer
  function transfer(
    address payable _to,
    uint _value
    ) public returns(bool) {
      // exception if account doesn't have enough
      require(balanceOf(msg.sender) >= _value);

      

      // return boolean

      // transfer event
  }



  // Set the Tokens
  // Real the total of tokens













}
