// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

contract ArtToken {

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
  mapping(address => mapping(address => uint)) public allowance;

  //  events
  event Transfer(
    address indexed _from,
    address indexed _to,
    uint256 _value
  );

  event Approval(
    address indexed _owner,
    address indexed _sender,
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
      // allowance
      allowance[msg.sender][_sender] = _value;
      // approve event
      emit Approval(msg.sender, _sender, _value);

      return true;
  }

  // transfeFrom
  function transferFrom(
    address _from,
    address _to,
    uint _value
  ) public returns(bool) {
    // require _from has enough token
    // require allowance is BIG enough
    require(balanceOf(_from) >= _value);
    require(allowance[_from][msg.sender] >= _value);
    
    // change the balance
    balance[_from] -= _value;
    balance[_to] += _value;
    // update the allowance
    allowance[_from][msg.sender] -= _value;
    // event trunsfer 
    emit Transfer(_from, _to, _value); 
    
    return true;
  }
}