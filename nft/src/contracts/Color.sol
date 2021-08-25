// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";


contract Color is ERC721, ERC721Enumerable {
    string[] public colors;
    address public owner; 
    mapping(string => bool) _colorExists;


    
    struct ColorCoin {
        uint id;
        uint price;
        string name;
        bool isForSale;
    }
    uint coinsCount = 0;
    mapping(uint => ColorCoin) public coins;


    constructor() ERC721("Color", "COLOR")  {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function mint(string memory _color) onlyOwner public {
        // Require unique color
        require(!_colorExists[_color]);
        // Color add color
        colors.push(_color);
        uint _id = colors.length;
        // Call the mint function


        _mint(msg.sender, _id);
        // Color track it
        _colorExists[_color] = true;
        // add color
        colorCount++;
        // add color name to id
        colorsName[colorCount] = _color;
    }

    function trunsfer(
        address _owner, 
        uint _tokenId
        ) public {
        // Require unique color
        string memory _color = colorsName[_tokenId];
        ColorCoin coin = coins[_tokenId]; 

        require(coin.isForSale);
        require(_colorExists[_color]);
        require(msg.value >= coin.price);

         // call transfer
        _transfer(_owner, msg.sender, _tokenId);
        // Aproval to sell

        // money send
        address(_owner).transfer(msg.value);

        emit Salle(_tokenId, msg.value, _owner)

    }

    function Approve() {

    }

    function sale(
        bool _newStatus,
        uint _id
        ) public {
            require(msg.sender == _owners[_id]);
            ColorCoin coin = coins[_id];
            require(coin.isForSale != _newStatus);

            coin.isForSale = _newStatus;
            coins[_id] = coin;
    }

    function changePrice(
        uint _id, 
        uint _newPrice
        ) public returns(bool){
            require(msg.sender == _owners[_id]);
            ColorCoin coin = coins[_id];
            require(coin.price != _newPrice);

            coin.price = _newPrice;
            coins[_id] = coin;

            return true;
    }


}