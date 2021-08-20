pragma solidity ^0.5.0;

import "./Token.sol";

contract EthSwap{
    string public name;
    Token public token;

    constructor(Token _token) public {
        name = "EthSwap Instant Exchange";
        token = _token;
    }

    function buyToken() public {

    }
}