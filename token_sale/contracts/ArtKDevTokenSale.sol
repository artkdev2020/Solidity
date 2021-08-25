// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

import './ArtToken.sol';
//import "./ArtKDevToken.sol";

contract ArtKDevTokenSale {
    address admin;
    ArtToken public artToken;
    uint public price;

    constructor (ArtToken _artToken) public {
        // assing an admin
        admin = msg.sender;
        // Token Contract
        artToken = _artToken;
        // Token Price
        price = 10000000000;
    }

}