pragma solidity ^0.5.0;

import "./DappToken.sol";
import "./DaiToken.sol";

contract TokenFarm{
    string public name = 'Dapp Token Farm';
    DappToken public dappToken;
    DaiToken public daiToken;
    address public owner;

    address[] public stakers; 
    mapping(address => uint) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;
    constructor(DappToken _dappToken, DaiToken _daiToken) public {
        dappToken = _dappToken;
        daiToken = _daiToken;
        owner = msg.sender;
    }

    // 1. Stakes Tokens (Deposit)
    function stakeTokens(uint _amount) public {
        // require
        require(_amount > 0, 'amount cannot be 0');

        // Transfer dai Tokens to this contract for stokiung
        daiToken.transferFrom(msg.sender, address(this), _amount);
        // update staking ballance
        stakingBalance[msg.sender] += _amount;

        // add user to stakers array *only if they haven't staked already 
        if(!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }
        // update staking status
        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }

    // 2. Unstaking Tokens
    function unstakeTokens() public {
        uint balance = stakingBalance[msg.sender];

        // require if balance < 0 no have staking
        require(balance > 0, 'balance cannot be 0');

        // transfer back dai token
        daiToken.transfer(msg.sender, balance);

        // reset staking balance
        stakingBalance[msg.sender] = 0;

        // update staking status
        isStaking[msg.sender] = false;
    }

    // 3.Issuing Tokens   

    function issueTokens() public {
        // only owner can call this function
        require(msg.sender == owner, 'caller must be the owner');

        for( uint i = 0; i < stakers.length; i++) {
            address recipient = stakers[i];
            uint balance = stakingBalance[recipient];
            if(balance > 0) {
                dappToken.transfer(recipient, balance);
            }
        }
    }
}