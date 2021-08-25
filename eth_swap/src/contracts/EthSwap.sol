pragma solidity ^0.5.0;

import "./Token.sol";

contract EthSwap {
    string public name;
    Token public token;
    uint256 public rate = 100;

    event TokensPurchased(
        address account,
        address token,
        uint256 amount,
        uint256 rate
    );

    event TokensSold(
        address account,
        address token,
        uint256 amount,
        uint256 rate
    );

    constructor(Token _token) public {
        name = "EthSwap Instant Exchange";
        token = _token;
    }

    function buyToken() public payable {
        // Calculate the number of token to buy
        uint256 _tokenAmount = msg.value * rate;
        // require that ethSwap has enough tokens
        require(token.balanceOf(address(this)) >= _tokenAmount);
        // transfer tokens to the user
        token.transfer(msg.sender, _tokenAmount);

        //emit an event
        emit TokensPurchased(msg.sender, address(token), _tokenAmount, rate);
    }

    function sellToken(uint256 _amount) public {
        // user can't sell more token then they have
        require(token.balanceOf(msg.sender) >= _amount);

        // calculate the amount of Ether to redeem
        uint256 _etherAmount = _amount / rate;
        // have enough ether in contract
        require(address(this).balance >= _etherAmount);
        // perform sale
        token.transferFrom(msg.sender, address(this), _amount);
        msg.sender.transfer(_etherAmount);
        //
        emit TokensSold(msg.sender, address(token), _amount, rate);
    }
}
