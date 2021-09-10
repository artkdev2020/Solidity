// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

import './ArtToken.sol';
//import "./ArtKDevToken.sol";


library Math {
    function add(uint x, uint y) internal pure returns (uint z) {
        require((z = x + y) >= x, "ds-math-add-overflow");
    }
    function sub(uint x, uint y) internal pure returns (uint z) {
        require((z = x - y) <= x, "ds-math-sub-underflow");
    }
    function mul(uint x, uint y) internal pure returns (uint z) {
        require(y == 0 || (z = x * y) / y == x, "ds-math-mul-overflow");
    }

    function min(uint x, uint y) internal pure returns (uint z) {
        return x <= y ? x : y;
    }
    function max(uint x, uint y) internal pure returns (uint z) {
        return x >= y ? x : y;
    }
    function imin(int x, int y) internal pure returns (int z) {
        return x <= y ? x : y;
    }
    function imax(int x, int y) internal pure returns (int z) {
        return x >= y ? x : y;
    }

    uint constant WAD = 10 ** 18;
    uint constant RAY = 10 ** 27;

    //rounds to zero if x*y < WAD / 2
    function wmul(uint x, uint y) internal pure returns (uint z) {
        z = add(mul(x, y), WAD / 2) / WAD;
    }
    //rounds to zero if x*y < WAD / 2
    function rmul(uint x, uint y) internal pure returns (uint z) {
        z = add(mul(x, y), RAY / 2) / RAY;
    }
    //rounds to zero if x*y < WAD / 2
    function wdiv(uint x, uint y) internal pure returns (uint z) {
        z = add(mul(x, WAD), y / 2) / y;
    }
    //rounds to zero if x*y < RAY / 2
    function rdiv(uint x, uint y) internal pure returns (uint z) {
        z = add(mul(x, RAY), y / 2) / y;
    }

    function rpow(uint x, uint n) internal pure returns (uint z) {
        z = n % 2 != 0 ? x : RAY;

        for (n /= 2; n != 0; n /= 2) {
            x = rmul(x, x);

            if (n % 2 != 0) {
                z = rmul(z, x);
            }
        }
    }
}

contract ArtKDevTokenSale {
    using Math for uint256;

    address admin;
    ArtToken public artToken;
    uint256 public price;
    uint256 public tokenSold;

    event Sell(
        address _buyer,
        uint256 _amount
    );

    constructor (
        ArtToken _artToken, 
        uint256 _price
        ) public {
        // assing an admin
        admin = msg.sender;
        // Token Contract
        artToken = _artToken;
        // Token Price
        price = _price;
    }

    // multiply


    // Buy Token
    function buyToken(
        uint256 _numberOfTokens
        ) public payable {
            // Require that value is equal to tokens
            require(msg.value == Math.mul(_numberOfTokens, price));
            // Require that the contract has enough tokens
            /*require(msg.value == _numberOfTokems * price);*/
            // Require that a transfer is successful

            tokenSold += _numberOfTokens;
            // Keep track of tokensSold
            // Event sell
            emit Sell(msg.sender, _numberOfTokens);


        } 



    // End sale

}