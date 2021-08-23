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

  //  events
  event Transfer(
    address indexed _from,
    address indexed _to,
    uint256 _value
  );

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
    address _to,
    uint _value
    ) public returns(bool) {
      // exception if account doesn't have enough
      require(balance[msg.sender] >= _value);
      // transfer the balance
      balance[msg.sender] -= _value;
      balance[_to] += _value;
      // transfer event
      emit Transfer(msg.sender, _to, _value);    
      // return boolean
      return true;
  }

  // approve
  function approve(
    address _sender, 
    uint256 _value
    ) public returns(bool) {
      
    }
  // transfeFrom

  













}
